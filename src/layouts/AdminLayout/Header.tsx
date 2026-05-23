import { Avatar, Badge, Layout, Menu } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { headerMenuItems } from './menuItems';

const { Header } = Layout;

export default function AppHeader() {
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
                <div className="flex items-center cursor-pointer gap-2 mr-4">
                    <Avatar className="!bg-amber-300 mr-2">h</Avatar>
                    <span className="text-sm font-medium">hieutm</span>
                </div>
            </div>
        </Header>
    );
}
