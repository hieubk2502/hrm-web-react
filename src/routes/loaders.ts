import { usePermissionStore } from '../store/permissionStore';

export const permissionLoader = async () => {
    const permissionStore = usePermissionStore();
    
    // Fetch permissions on app load
    if (permissionStore.getAllPermissions().length === 0) {
        await permissionStore.fetchPermissions();
    }
    
    return null;
};
