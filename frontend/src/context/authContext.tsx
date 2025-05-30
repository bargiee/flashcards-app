import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '../api';

export interface User {
    id: number;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isChecking: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (u: string, e: string, p: string) => Promise<void>;
    logout: () => Promise<void>;
    refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    const fetchUser = async () => {
        try {
            const { data } = await api.get<User>('/users/me');
            setUser(data);
        } catch (err: any) {
            if (err?.response?.status === 401) {
                setUser(null);
            }
        } finally {
            setIsChecking(false);
        }
    };

    const login = async (email: string, password: string) => {
        await api.post('/auth/login', { email, password });
        await fetchUser();
    };

    const register = async (username: string, email: string, password: string) => {
        await api.post('/auth/register', { username, email, password });
        await login(email, password);
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isChecking,
        login,
        register,
        logout,
        refetch: fetchUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
