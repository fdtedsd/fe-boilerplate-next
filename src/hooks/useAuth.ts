import { useAtom } from 'jotai';
import {
    authAtom,
    isAuthenticatedAtom,
    currentUserAtom,
    authTokenAtom,
    loginAtom,
    logoutAtom,
    checkAuthAtom,
    refreshTokenAtom,
    isTokenExpired,
    getTokenTimeRemaining,
} from '@/store/atoms/auth';

export function useAuth() {
    const [authState] = useAtom(authAtom);
    const [isAuthenticated] = useAtom(isAuthenticatedAtom);
    const [user] = useAtom(currentUserAtom);
    const [token] = useAtom(authTokenAtom);
    const [, login] = useAtom(loginAtom);
    const [, logout] = useAtom(logoutAtom);
    const [, checkAuth] = useAtom(checkAuthAtom);
    const [, refreshToken] = useAtom(refreshTokenAtom);

    const handleLogin = async (credentials: { email: string; password: string }) => {
        try {
            await login(credentials);
            return { success: true };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
        }
    };

    const handleLogout = () => {
        logout();
    };

    const isTokenValid = token ? !isTokenExpired(token) : false;
    const tokenTimeRemaining = token ? getTokenTimeRemaining(token) : 0;

    return {
        isAuthenticated,
        user,
        token,
        isLoading: authState.isLoading,
        login: handleLogin,
        logout: handleLogout,
        refreshToken,
        checkAuth,
        isTokenValid,
        tokenTimeRemaining,
        isTokenExpired: (tokenToCheck: string) => isTokenExpired(tokenToCheck),
        getTokenTimeRemaining: (tokenToCheck: string) => getTokenTimeRemaining(tokenToCheck),
        authState,
    };
}
