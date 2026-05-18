import {useState} from 'react';
import {Avatar, Badge, Layout, Menu} from 'antd';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {
    BellOutlined,
    DashboardOutlined,
    DollarOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TeamOutlined
} from '@ant-design/icons';
import {ROUTES} from '../constants/routeNames';

const {Header, Sider, Content, Footer} = Layout;

// Define items for Header (Redirect to other sites)
const headerMenuItems = [
    {key: 'data', label: <Link to={ROUTES.HOME}>ĐIỀU HÀNH SỐ LIỆU</Link>},
    {key: 'corp', label: <Link to={ROUTES.HOME}>QUẢN TRỊ DOANH NGHIỆP</Link>},
    {key: 'tech', label: <Link to={ROUTES.HOME}>VẬN HÀNH KỸ THUẬT</Link>},
    {key: 'hr', label: <Link to={ROUTES.HR.DASHBOARD}>QUẢN LÝ NHÂN SỰ, CHÍNH SÁCH THU NHẬP</Link>},
    {key: 'train', label: <Link to={ROUTES.HOME}>QUẢN LÝ ĐÀO TẠO</Link>},
];

// Define items for Sidebar (Level 1, Level 2, Level 3)
const siderMenuItems = [
    {key: ROUTES.HR.DASHBOARD, icon: <DashboardOutlined/>, label: <Link to={ROUTES.HR.DASHBOARD}>DASHBOARD</Link>},
    {key: ROUTES.HR.OKR, icon: <TeamOutlined/>, label: 'OKR - KPI TỔ CHỨC'},
    {key: ROUTES.HR.ORG, icon: <TeamOutlined/>, label: 'QUẢN LÝ TỔ CHỨC'},
    {
        key: ROUTES.HR.BENEFITS.ROOT,
        icon: <DollarOutlined/>,
        label: 'THU NHẬP VÀ PHÚC LỢI', // Cấp 1
        children: [
            {
                key: ROUTES.HR.BENEFITS.BUDGET,
                label: <Link to={ROUTES.HR.BENEFITS.BUDGET}>NGÂN SÁCH & KẾ HOẠCH</Link>, // Cấp 2
                children: [
                    // Cấp 3
                    {
                        key: ROUTES.HR.BENEFITS.BUDGET,
                        label: <Link to={ROUTES.HR.BENEFITS.BUDGET}>Chính sách lương theo đơn vị</Link>
                    },
                    {key: ROUTES.HR.BENEFITS.PLAN, label: <Link to={ROUTES.HR.BENEFITS.PLAN}>Kế hoạch thu nhập</Link>},
                ]
            },
            {key: ROUTES.HR.BENEFITS.BONUS, label: 'THƯỞNG HIỆU QUẢ CUỐI NĂM'},
            {key: ROUTES.HR.BENEFITS.SALARY, label: 'BẢNG LƯƠNG'},
        ]
    },
];

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <Layout className="min-h-screen">
            <Header
                className="!bg-white !px-4 flex items-center justify-between border-b border-gray-100 h-14 w-full fixed z-10">
                <div className="flex items-center h-full">
                    <div className="w-48 text-blue-800 font-extrabold text-xl mr-8 flex items-center h-full">
                        <span className="mr-1 text-2xl">▲</span>
                        <span>DNP</span>
                        <span className="font-normal text-black text-sm ml-2 relative top-0.5">water</span>
                    </div>
                    <Menu
                        mode="horizontal"
                        selectedKeys={['hr']}
                        items={headerMenuItems}
                        className="border-none min-w-280 font-medium h-14 leading-14"
                    />
                </div>
                <div className="flex items-center gap-6">
                    <Badge count={99} overflowCount={99}>
                        <BellOutlined className="text-xl cursor-pointer text-gray-600"/>
                    </Badge>
                    <div className="flex items-center cursor-pointer">
                        <Avatar className="!bg-amber-300 !mr-2">h</Avatar>
                        <span className="text-sm font-medium">hieutm</span>
                    </div>
                </div>
            </Header>

            <Layout className="mr-">
                {/* SIDEBAR */}
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={250}
                    theme="dark"
                    style={{background: '#0052cc'}}
                    className="overflow-auto h-[calc(100vh-56px)] fixed left-0 top-14"
                >
                    <div
                        className="p-4 text-white text-lg cursor-pointer hover:bg-blue-600 flex items-center justify-center transition-colors border-b border-blue-400/30"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </div>
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={[location.pathname]}
                        defaultOpenKeys={['/hr/benefits']}
                        items={siderMenuItems}
                        style={{background: '#0052cc'}}
                        className="border-none mt-2"
                    />
                </Sider>

                {/* MAIN CONTENT */}
                <Layout className="bg-gray-50 transition-all duration-300">
                    <Content
                        className="m-1 bg-white p-6 rounded-md shadow-sm border border-gray-200 min-h-[calc(100vh-150px)]">
                        <Outlet/>
                    </Content>
                    <Footer className="text-center text-gray-500 text-xs py-4">
                        Copyright ©2023 Bản quyền thuộc về Công Ty Cổ Phần Đầu Tư Ngành Nước DNP
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}
