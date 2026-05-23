import { createContext, useContext, type ReactNode, useState, useCallback } from 'react';

type PermissionContextType = {
    permissions: string[];
    loading: boolean;
    error: string | null;
    fetchPermissions: () => Promise<void>;
    hasPermission: (path: string) => boolean;
    getAllPermissions: () => string[];
};

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export function PermissionProvider({ children }: { children: ReactNode }) {
    const [permissions, setPermissions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPermissions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Replace this with your actual API call
            // const response = await fetch('/api/permissions');
            // const data = await response.json();
            // setPermissions(data.permissions);

            // Mock data for now
            setPermissions([
                '/hr/dashboard',
                '/hr/benefits',
                '/hr/benefits/budget',
                '/hr/benefits/bonus',
                '/hr/okr',
            ]);
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
