import { Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { siderMenuItems } from './menuItems';

type AdminSidebarProps = {
    collapsed: boolean;
    selectedKey: string;
    onToggle: () => void;
};

const { Sider } = Layout;

export default function AdminSidebar({ collapsed, selectedKey, onToggle }: AdminSidebarProps) {
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={320}
            theme="dark"
            style={{ background: '#1967db' }}
            className="overflow-auto h-[calc(100vh-56px)] fixed left-0"
        >
            <button
                type="button"
                className="w-full p-4 text-white text-lg cursor-pointer hover:bg-blue-600 flex items-center justify-center transition-colors border-b border-blue-400/30"
                onClick={onToggle}
                aria-label={collapsed ? 'Mở sidebar' : 'Thu sidebar'}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[selectedKey]}
                defaultOpenKeys={['/hr/benefits']}
                items={siderMenuItems}
                style={{ background: '#1967db' }}
                className="border-none"
            />
        </Sider>
    );
}
