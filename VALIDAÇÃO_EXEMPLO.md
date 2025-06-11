# 📝 Validação com Zod + React Hook Form - Exemplos

Este documento mostra como usar a validação implementada no projeto e como criar novos formulários validados.

## 🎯 Exemplo Básico Implementado

O `DemoForm.tsx` demonstra um formulário completo com:

### Schema de Validação

```typescript
const formSchema = z.object({
  name: z.string().min(1, t('form.errors.nameRequired')).min(2, t('form.errors.nameMin')),
  email: z.string().min(1, t('form.errors.emailRequired')).email(t('form.errors.emailInvalid')),
  notifications: z.boolean(),
});
```

### Hook Form Setup

```typescript
const form = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: '',
    email: '',
    notifications: false,
  },
});
```

### Componente Form Field

```typescript
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('form.fields.email')}</FormLabel>
      <FormControl>
        <Input
          type="email"
          placeholder={t('form.fields.emailPlaceholder')}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

## 🚀 Criando Novos Formulários

### 1. Schema de Validação Avançado

```typescript
const userSchema = z
  .object({
    // Strings com validações
    username: z
      .string()
      .min(3, 'Username deve ter pelo menos 3 caracteres')
      .max(20, 'Username não pode ter mais de 20 caracteres')
      .regex(/^[a-zA-Z0-9_]+$/, 'Apenas letras, números e underscore'),

    // Email
    email: z.string().email('Email inválido'),

    // Senha com confirmação
    password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string(),

    // Número
    age: z.number().min(18, 'Deve ser maior de idade').max(120, 'Idade inválida'),

    // Enum/Select
    role: z.enum(['user', 'admin', 'moderator']),

    // Boolean
    terms: z.boolean().refine((val) => val === true, {
      message: 'Você deve aceitar os termos',
    }),

    // Array
    skills: z.array(z.string()).min(1, 'Selecione pelo menos uma habilidade'),

    // Objeto aninhado
    address: z.object({
      street: z.string().min(1, 'Rua é obrigatória'),
      city: z.string().min(1, 'Cidade é obrigatória'),
      zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  });
```

### 2. Validações Condicionais

```typescript
const conditionalSchema = z
  .object({
    hasAddress: z.boolean(),
    address: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.hasAddress && !data.address) {
        return false;
      }
      return true;
    },
    {
      message: 'Endereço é obrigatório quando marcado',
      path: ['address'],
    },
  );
```

### 3. Validação Assíncrona

```typescript
const asyncSchema = z.object({
  email: z
    .string()
    .email()
    .refine(
      async (email) => {
        // Simular verificação de email único
        const response = await fetch(`/api/check-email?email=${email}`);
        const result = await response.json();
        return !result.exists;
      },
      {
        message: 'Este email já está em uso',
      },
    ),
});
```

## 🎨 Componentes de Formulário

### Input com Mask

```typescript
<FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Telefone</FormLabel>
      <FormControl>
        <Input
          placeholder="(11) 99999-9999"
          {...field}
          onChange={(e) => {
            const masked = maskPhone(e.target.value);
            field.onChange(masked);
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Select/Dropdown

```typescript
<FormField
  control={form.control}
  name="country"
  render={({ field }) => (
    <FormItem>
      <FormLabel>País</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um país" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="br">Brasil</SelectItem>
          <SelectItem value="us">Estados Unidos</SelectItem>
          <SelectItem value="ca">Canadá</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Checkbox Group

```typescript
<FormField
  control={form.control}
  name="interests"
  render={() => (
    <FormItem>
      <div className="mb-4">
        <FormLabel className="text-base">Interesses</FormLabel>
      </div>
      {interests.map((item) => (
        <FormField
          key={item.id}
          control={form.control}
          name="interests"
          render={({ field }) => {
            return (
              <FormItem
                key={item.id}
                className="flex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item.id)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...field.value, item.id])
                        : field.onChange(
                            field.value?.filter(
                              (value) => value !== item.id
                            )
                          )
                    }}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  {item.label}
                </FormLabel>
              </FormItem>
            )
          }}
        />
      ))}
      <FormMessage />
    </FormItem>
  )}
/>
```

## 🌍 Internacionalização das Mensagens

### Estrutura de Traduções

```json
{
  "validation": {
    "required": "Este campo é obrigatório",
    "email": "Email deve ter um formato válido",
    "minLength": "Deve ter pelo menos {{min}} caracteres",
    "maxLength": "Não pode ter mais de {{max}} caracteres",
    "passwordMatch": "As senhas devem coincidir",
    "terms": "Você deve aceitar os termos de uso"
  }
}
```

### Usando nas Validações

```typescript
const schema = z.object({
  email: z.string().min(1, t('validation.required')).email(t('validation.email')),
  password: z.string().min(8, t('validation.minLength', { min: 8 })),
});
```

## 🔄 Submit e Estados

### Handling Submit

```typescript
const onSubmit = async (data: FormValues) => {
  try {
    setIsSubmitting(true);

    // Enviar dados
    await api.createUser(data);

    // Sucesso
    toast.success('Usuário criado com sucesso!');
    form.reset();
  } catch (error) {
    // Tratar erros do servidor
    if (error.field === 'email') {
      form.setError('email', {
        message: 'Este email já está em uso',
      });
    } else {
      toast.error('Erro ao criar usuário');
    }
  } finally {
    setIsSubmitting(false);
  }
};
```

### Estados Visuais

```typescript
<Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
  {isSubmitting ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Salvando...
    </>
  ) : (
    'Salvar'
  )}
</Button>
```

## 🎯 Boas Práticas

1. **Sempre use TypeScript** com `z.infer<typeof schema>`
2. **Valide no frontend e backend** - nunca confie apenas no frontend
3. **Mensagens claras** - seja específico sobre o que está errado
4. **Internacionalização** - prepare para múltiplos idiomas desde o início
5. **Acessibilidade** - use `FormLabel` e `FormMessage` para screen readers
6. **Performance** - use `watch` apenas quando necessário
7. **UX** - mostre estados de loading, sucesso e erro claramente

## 🐛 Debug e Desenvolvimento

### Ver dados em tempo real

```typescript
const watchedValues = watch();
console.log('Form values:', watchedValues);
console.log('Form errors:', errors);
console.log('Form state:', formState);
```

### Reset com valores

```typescript
form.reset({
  name: 'Novo nome',
  email: 'novo@email.com',
});
```

Este sistema de validação garante uma experiência de usuário consistente e robusta! 🚀
