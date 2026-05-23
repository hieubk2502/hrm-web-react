import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

export interface User {
    username: string;
    name: string;
    email: string;
    role: 'admin' | 'employee';
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user credentials and their respective info
const MOCK_USERS: Record<string, { password: string; info: User }> = {
    admin: {
        password: 'admin123',
        info: {
            username: 'admin',
            name: 'Quản trị viên (Admin)',
            email: 'admin@hrm.com',
            role: 'admin',
            avatar: 'A'
        }
    },
    employee: {
        password: 'employee123',
        info: {
            username: 'employee',
            name: 'Nguyễn Văn Nhân Viên',
            email: 'employee@hrm.com',
            role: 'employee',
            avatar: 'E'
        }
    }
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('hrm_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(false);

    const login = useCallback(async (username: string, password: string): Promise<boolean> => {
        setLoading(true);
        // Simulate API network call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockUser = MOCK_USERS[username.toLowerCase()];
        if (mockUser && mockUser.password === password) {
            setUser(mockUser.info);
            localStorage.setItem('hrm_user', JSON.stringify(mockUser.info));
            setLoading(false);
            return true;
        }

        setLoading(false);
        return false;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('hrm_user');
        localStorage.removeItem('hrm_permissions'); // Clear permissions cache as well
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthStore() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthStore must be used within an AuthProvider');
    }
    return context;
}
