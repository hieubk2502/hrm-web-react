import {useState} from 'react';
import {Layout} from 'antd';
import {Outlet, useLocation} from 'react-router-dom';
import AdminFooter from './AdminFooter';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const {Content} = Layout;

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <Layout className="min-h-screen">
            <AdminHeader/>

            <Layout className="mt-14">
                <AdminSidebar
                    collapsed={collapsed}
                    onToggle={() => setCollapsed((value) => !value)}
                    selectedKey={location.pathname}
                />

                <Layout
                    className="bg-gray-50 transition-all duration-300"
                    style={{marginLeft: collapsed ? 80 : 280}}
                >
                    <Content className="m-4 bg-white p-6 rounded-md shadow-sm border border-gray-200 min-h-[calc(100vh-150px)]">
                        <Outlet/>
                    </Content>
                    <AdminFooter/>
                </Layout>
            </Layout>
        </Layout>
    );
}
