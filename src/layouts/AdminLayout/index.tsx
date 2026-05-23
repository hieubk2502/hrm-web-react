import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation, useMatches, Navigate } from 'react-router-dom';
import { usePermissionStore } from '../../store/permissionStore';
import { useAuthStore } from '../../store/authStore';
import { ROUTES } from '../../constants/routeNames';
import Unauthorized from '../../pages/common/Unauthorized';
import AppFooter from './Footer';
import AppHeader from './Header';
import Sidebar from './Sidebar';

const { Content } = Layout;

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const matches = useMatches();
    const authStore = useAuthStore();
    const permissionStore = usePermissionStore();

    useEffect(() => {
        // Fetch permissions on mount if user is authenticated
        if (authStore.isAuthenticated && permissionStore.permissions.length === 0) {
            permissionStore.fetchPermissions(authStore.user?.role);
        }
    }, [authStore.isAuthenticated, authStore.user?.role, permissionStore.permissions.length]);

    // Check if user is logged in
    if (!authStore.isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    // Get the role from current route match
    const currentMatch = matches[matches.length - 1];
    const requiredRole = (currentMatch?.handle as any)?.role;

    // Check if user has permission
    if (requiredRole && !permissionStore.hasPermission(requiredRole)) {
        return <Unauthorized />;
    }

    return (
        <Layout className="min-h-screen">
            <AppHeader />

            <Layout className="mt-14">
                <Sidebar
                    collapsed={collapsed}
                    onToggle={() => setCollapsed((value) => !value)}
                    selectedKey={location.pathname}
                />

                <Layout
                    className="bg-gray-50 transition-all duration-300 h-[calc(100vh-56px)] flex flex-col"
                >
                    <div className="flex-1 overflow-auto p-4">
                        <Content className="bg-white p-6 rounded-md shadow-sm border border-gray-200 min-h-full">
                            <Outlet />
                        </Content>
                    </div>
                    <AppFooter />
                </Layout>
            </Layout>
        </Layout>
    );
}
