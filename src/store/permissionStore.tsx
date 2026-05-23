import { createContext, useContext, type ReactNode, useState, useCallback } from 'react';

type PermissionContextType = {
    permissions: string[];
    loading: boolean;
    error: string | null;
    fetchPermissions: (role?: string) => Promise<void>;
    hasPermission: (path: string) => boolean;
    getAllPermissions: () => string[];
};

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export function PermissionProvider({ children }: { children: ReactNode }) {
    const [permissions, setPermissions] = useState<string[]>(() => {
        const saved = localStorage.getItem('hrm_permissions');
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPermissions = useCallback(async (role?: string) => {
        setLoading(true);
        setError(null);
        try {
            let rolePermissions: string[] = [];

            if (role === 'admin') {
                rolePermissions = [
                    '/hr/dashboard',
                    '/hr/okr',
                    '/hr/org',
                    '/hr/benefits',
                    '/hr/benefits/budget',
                    '/hr/benefits/bonus',
                    '/hr/benefits/salary',
                ];
            } else if (role === 'employee') {
                rolePermissions = [
                    '/hr/dashboard',
                    '/hr/okr',
                    '/hr/benefits',
                    '/hr/benefits/budget',
                ];
            }

            setPermissions(rolePermissions);
            localStorage.setItem('hrm_permissions', JSON.stringify(rolePermissions));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch permissions');
        } finally {
            setLoading(false);
        }
    }, []);

    const hasPermission = useCallback((path: string): boolean => {
        if (!path) return true;
        return permissions.includes(path);
    }, [permissions]);

    const getAllPermissions = useCallback(() => permissions, [permissions]);

    return (
        <PermissionContext.Provider
            value={{
                permissions,
                loading,
                error,
                fetchPermissions,
                hasPermission,
                getAllPermissions,
            }}
        >
            {children}
        </PermissionContext.Provider>
    );
}

export function usePermissionStore() {
    const context = useContext(PermissionContext);
    if (context === undefined) {
        throw new Error('usePermissionStore must be used within PermissionProvider');
    }
    return context;
}
