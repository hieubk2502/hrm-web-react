import {Navigate} from "react-router-dom";
import {DashboardOutlined, DollarOutlined, TeamOutlined} from '@ant-design/icons';
import Dashboard from "../pages/hr/Dashboard";
import Budget from "../pages/hr/benefits/Budget";
import {PATHS, ROUTES} from "../constants/routeNames";

export const hrRoutes = [
    {
        path: PATHS.DASHBOARD,
        element: <Dashboard/>,
        handle: { title: 'DASHBOARD', icon: <DashboardOutlined/>, showInMenu: true }
    },
    {
        path: PATHS.OKR,
        handle: { title: 'OKR - KPI TỔ CHỨC', icon: <TeamOutlined/>, showInMenu: true }
    },
    {
        path: PATHS.ORG,
        handle: { title: 'QUẢN LÝ TỔ CHỨC', icon: <TeamOutlined/>, showInMenu: true }
    },
    {
        path: PATHS.BENEFITS,
        handle: { title: 'THU NHẬP VÀ PHÚC LỢI', icon: <DollarOutlined/>, showInMenu: true },
        children: [
            {
                index: true,
                element: <Navigate to={ROUTES.HR.BENEFITS.BUDGET} replace/>
            },
            {
                path: PATHS.BUDGET,
                element: <Budget/>,
                handle: { title: 'NGÂN SÁCH & KẾ HOẠCH', showInMenu: true }
            },
            {
                path: PATHS.BONUS,
                handle: { title: 'THƯỞNG HIỆU QUẢ CUỐI NĂM', showInMenu: true }
            },
            {
                path: PATHS.SALARY,
                handle: { title: 'BẢNG LƯƠNG', showInMenu: true }
            }
        ]
    }
];
