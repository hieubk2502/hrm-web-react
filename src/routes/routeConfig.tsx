import {Navigate} from "react-router-dom";
import {DashboardOutlined, DollarOutlined, TeamOutlined} from '@ant-design/icons';
import Dashboard from "../pages/hr/Dashboard";
import Budget from "../pages/hr/benefits/budget";
import {PATHS, ROUTES, ROLE_PATHS} from "../constants/routeNames";

export const hrRoutes = [
    {
        path: PATHS.DASHBOARD,
        element: <Dashboard/>,
        handle: { 
            title: 'DASHBOARD',
            name: 'dashboard',
            role: ROLE_PATHS.DASHBOARD,
            icon: <DashboardOutlined/>, 
            showInMenu: true 
        }
    },
    {
        path: PATHS.OKR,
        handle: { 
            title: 'OKR - KPI TỔ CHỨC',
            name: 'okr',
            role: ROLE_PATHS.OKR,
            icon: <TeamOutlined/>, 
            showInMenu: true 
        }
    },
    {
        path: PATHS.ORG,
        handle: { 
            title: 'QUẢN LÝ TỔ CHỨC',
            name: 'organization',
            role: ROLE_PATHS.ORG,
            icon: <TeamOutlined/>, 
            showInMenu: true 
        }
    },
    {
        path: PATHS.BENEFITS,
        handle: { 
            title: 'THU NHẬP VÀ PHÚC LỢI',
            name: 'benefits',
            role: ROLE_PATHS.BENEFITS,
            icon: <DollarOutlined/>, 
            showInMenu: true 
        },
        children: [
            {
                index: true,
                element: <Navigate to={ROUTES.HR.BENEFITS.BUDGET} replace/>
            },
            {
                path: PATHS.BUDGET,
                element: <Budget/>,
                handle: { 
                    title: 'NGÂN SÁCH & KẾ HOẠCH',
                    name: 'budget',
                    role: ROLE_PATHS.BUDGET,
                    showInMenu: true 
                }
            },
            {
                path: PATHS.BONUS,
                handle: { 
                    title: 'THƯỞNG HIỆU QUẢ CUỐI NĂM',
                    name: 'bonus',
                    role: ROLE_PATHS.BONUS,
                    showInMenu: true 
                }
            },
            {
                path: PATHS.SALARY,
                handle: { 
                    title: 'BẢNG LƯƠNG',
                    name: 'salary',
                    role: ROLE_PATHS.SALARY,
                    showInMenu: true 
                }
            }
        ]
    }
];
