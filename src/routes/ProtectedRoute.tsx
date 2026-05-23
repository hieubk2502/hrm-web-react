import type { ReactNode } from 'react';
import { usePermissionStore } from '../store/permissionStore';
import Unauthorized from '../pages/common/Unauthorized';

type ProtectedRouteProps = {
    element: ReactNode;
    role?: string; // path-based role like '/hr/dashboard'
};

export default function ProtectedRoute({ element, role }: ProtectedRouteProps) {
    const permissionStore = usePermissionStore();

    // If no role is specified, allow access
    if (!role) {
        return element;
    }

    // Check if user has permission for this role/path
    if (!permissionStore.hasPermission(role)) {
        return <Unauthorized />;
    }

    return element;
}
