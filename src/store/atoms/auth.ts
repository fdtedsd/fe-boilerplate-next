import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { generateMockJWT, validateJWT, decodeJWT } from '@/utils/jwt';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  token: string | null;
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
  token: null,
});

// Atom derivado para verificar se está logado
export const isAuthenticatedAtom = atom((get) => get(authAtom).isAuthenticated);

// Atom derivado para obter o usuário atual
export const currentUserAtom = atom((get) => get(authAtom).user);

// Atom derivado para obter o token
export const authTokenAtom = atom((get) => get(authAtom).token);

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
          const token = generateMockJWT({
            sub: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
          });
          set(authAtom, {
            isAuthenticated: true,
            user: mockUser,
            isLoading: false,
            token,
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
    token: null,
  });
});

// Atom para verificar e restaurar autenticação do token
export const checkAuthAtom = atom(
  null,
  (get, set) => {
    const currentAuth = get(authAtom);

    if (currentAuth.isAuthenticated && currentAuth.token) {
      return;
    }

    if (currentAuth.token && validateJWT(currentAuth.token)) {
      const payload = decodeJWT(currentAuth.token);
      if (payload) {
        const user = {
          id: payload.sub,
          name: payload.name,
          email: payload.email,
        };
        set(authAtom, {
          ...currentAuth,
          isAuthenticated: true,
          user,
        });
        return;
      }
    }

    set(authAtom, {
      isAuthenticated: false,
      user: null,
      isLoading: false,
      token: null,
    });
  },
);

export const refreshTokenAtom = atom(
  null,
  (get, set) => {
    const currentAuth = get(authAtom);

    if (currentAuth.user && currentAuth.token) {
      const newToken = generateMockJWT({
        sub: currentAuth.user.id,
        name: currentAuth.user.name,
        email: currentAuth.user.email,
      });
      set(authAtom, {
        ...currentAuth,
        token: newToken,
      });
    }
  },
);

export const isTokenExpired = (token: string): boolean => {
  return !validateJWT(token);
};

export const getTokenTimeRemaining = (token: string): number => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return 0;

    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    return Math.max(0, payload.exp - currentTime);
  } catch {
    return 0;
  }
};
