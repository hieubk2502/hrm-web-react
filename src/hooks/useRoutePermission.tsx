import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePermissionStore } from '../store/permissionStore';
import Unauthorized from '../pages/common/Unauthorized';

export function useRoutePermission() {
    const location = useLocation();
    const permissionStore = usePermissionStore();
    const matches = location.pathname.split('/').filter(Boolean);

    // Build the current path like /hr/dashboard
    const currentPath = '/' + matches.join('/');

    useEffect(() => {
        // Fetch permissions on mount if not already loaded
        if (permissionStore.getAllPermissions.length === 0) {
            permissionStore.fetchPermissions();
        }
    }, []);

    return {
        currentPath,
        hasPermission: (role?: string) => !role || permissionStore.hasPermission(role),
        permissionStore,
    };
}

type ProtectedOutletProps = {
    role?: string;
};

export function ProtectedOutlet({ role }: ProtectedOutletProps) {
    const { hasPermission } = useRoutePermission();

    if (!hasPermission(role)) {
        return <Unauthorized />;
    }

    return null; // Render Outlet normally in the layout
}
