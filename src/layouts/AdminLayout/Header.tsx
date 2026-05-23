import { Avatar, Badge, Layout, Menu, Dropdown, type MenuProps } from 'antd';
import { BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { headerMenuItems } from './menuItems';
import { useAuthStore } from '../../store/authStore';

const { Header } = Layout;

export default function AppHeader() {
    const { user, logout } = useAuthStore();

    // Get last initial of user's name
    const initials = user?.name 
        ? user.name.trim().split(' ').pop()?.charAt(0).toUpperCase() 
        : 'U';

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'info',
            label: (
                <div className="py-1 px-2">
                    <div className="font-bold text-gray-800">{user?.name}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                    <div className="text-xs mt-1 px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded inline-block font-semibold uppercase">
                        {user?.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
                    </div>
                </div>
            ),
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            danger: true,
        },
    ];

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'logout') {
            logout();
        }
    };

    return (
        <Header className="!bg-white !px-4 flex items-center justify-between border-b border-gray-100 h-14 w-full fixed z-10">
            <div className="flex items-center h-full">
                <div className="w-48 text-blue-800 font-extrabold text-xl mr-30 flex items-center h-full">
                    <span className="mr-1 text-3xl"></span>
                    <span>DNP</span>
                    <span className="font-normal text-gray-500 text-sm ml-2 relative top-0.5">water</span>
                </div>
                <Menu
                    mode="horizontal"
                    selectedKeys={['hr']}
                    items={headerMenuItems}
                    className="border-none min-w-280 font-medium h-14"
                />
            </div>
            <div className="flex items-center gap-6">
                <Badge count={99} overflowCount={99}>
                    <BellOutlined className="text-xl cursor-pointer text-gray-600" />
                </Badge>
                
                <Dropdown 
                    menu={{ items: userMenuItems, onClick: handleMenuClick }} 
                    placement="bottomRight" 
                    trigger={['click']}
                    overlayClassName="min-w-48"
                >
                    <div className="flex items-center cursor-pointer gap-2 mr-4 hover:opacity-80 transition-opacity">
                        <Avatar className="!bg-blue-600 mr-2">{initials}</Avatar>
                        <span className="text-sm font-medium text-gray-700">{user?.name || 'User'}</span>
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
}
