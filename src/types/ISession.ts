export interface TSession {
    isAuth: boolean;
    user: number | null
    role: 'admin' | 'user' | 'guest' | 'vendor'
}
