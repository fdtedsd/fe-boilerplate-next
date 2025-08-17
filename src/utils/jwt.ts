export interface JWTPayload {
    sub: string;
    name: string;
    email: string;
    iat: number;
    exp: number;
}

export interface JWTHeader {
    alg: string;
    typ: string;
}

export function generateMockJWT(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    const header: JWTHeader = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);

    const jwtPayload: JWTPayload = {
        ...payload,
        iat: now,
        exp: now + (24 * 60 * 60), // 24 hours
    };

    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(jwtPayload));
    const signature = btoa('mock-signature');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function validateJWT(token: string): boolean {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return false;

        const payload: JWTPayload = JSON.parse(atob(parts[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        return payload.exp > currentTime;
    } catch {
        return false;
    }
}

export function decodeJWT(token: string): JWTPayload | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const payload: JWTPayload = JSON.parse(atob(parts[1]));
        return payload;
    } catch {
        return null;
    }
}

export function isJWTExpired(token: string): boolean {
    try {
        const payload = decodeJWT(token);
        if (!payload) return true;

        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp <= currentTime;
    } catch {
        return true;
    }
}

export function getJWTTimeRemaining(token: string): number {
    try {
        const payload = decodeJWT(token);
        if (!payload) return 0;

        const currentTime = Math.floor(Date.now() / 1000);
        return Math.max(0, payload.exp - currentTime);
    } catch {
        return 0;
    }
}
