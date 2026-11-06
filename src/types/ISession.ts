export interface TSession {
    isAuth: boolean;
    user: string | number | null
    role: 'ADMIN' | 'USER' | 'guest' | 'VENDOR'
}
