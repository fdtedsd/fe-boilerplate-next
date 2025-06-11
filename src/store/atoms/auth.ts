import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao.silva@example.com',
};

// Estado de autenticação persistido no localStorage
export const authAtom = atomWithStorage<AuthState>('auth', {
  isAuthenticated: false,
  user: null,
  isLoading: false,
});

// Atom derivado para verificar se está logado
export const isAuthenticatedAtom = atom((get) => get(authAtom).isAuthenticated);

// Atom derivado para obter o usuário atual
export const currentUserAtom = atom((get) => get(authAtom).user);

// Action atoms para login e logout
export const loginAtom = atom(
  null,
  (get, set, credentials: { email: string; password: string }) => {
    // Simular loading
    set(authAtom, { ...get(authAtom), isLoading: true });

    // Simular delay de autenticação
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication logic
        if (credentials.email === 'admin@example.com' && credentials.password === '123456') {
          set(authAtom, {
            isAuthenticated: true,
            user: mockUser,
            isLoading: false,
          });
          resolve();
        } else {
          set(authAtom, { ...get(authAtom), isLoading: false });
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000);
    });
  },
);

export const logoutAtom = atom(null, (get, set) => {
  set(authAtom, {
    isAuthenticated: false,
    user: null,
    isLoading: false,
  });
});
