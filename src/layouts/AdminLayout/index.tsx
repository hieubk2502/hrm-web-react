import { useState } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import AppFooter from './Footer';
import AppHeader from './Header';
import Sidebar from './Sidebar';

const { Content } = Layout;

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

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
