import {Navigate} from "react-router-dom";
import {DashboardOutlined, DollarOutlined, TeamOutlined} from '@ant-design/icons';
import Dashboard from "../pages/hr/Dashboard";
import Budget from "../pages/hr/benefits/budget";
import {PATHS, ROUTES} from "../constants/routeNames";

export const hrRoutes = [
    {
        path: PATHS.DASHBOARD,
        element: <Dashboard/>,
        handle: { 
            title: 'DASHBOARD',
            name: 'dashboard',
            role: '/hr/dashboard',
            icon: <DashboardOutlined/>, 
            showInMenu: true 
        }
    },
    {
        path: PATHS.OKR,
        handle: { 
            title: 'OKR - KPI TỔ CHỨC',
            name: 'okr',
            role: '/hr/okr',
            icon: <TeamOutlined/>, 
            showInMenu: true 
        }
    },
    {
        path: PATHS.ORG,
        handle: { 
            title: 'QUẢN LÝ TỔ CHỨC',
            name: 'organization',
            role: '/hr/org',
            icon: <TeamOutlined/>, 
            showInMenu: true 
        }
    },
    {
        path: PATHS.BENEFITS,
        handle: { 
            title: 'THU NHẬP VÀ PHÚC LỢI',
            name: 'benefits',
            role: '/hr/benefits',
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
                    role: '/hr/benefits/budget',
                    showInMenu: true 
                }
            },
            {
                path: PATHS.BONUS,
                handle: { 
                    title: 'THƯỞNG HIỆU QUẢ CUỐI NĂM',
                    name: 'bonus',
                    role: '/hr/benefits/bonus',
                    showInMenu: true 
                }
            },
            {
                path: PATHS.SALARY,
                handle: { 
                    title: 'BẢNG LƯƠNG',
                    name: 'salary',
                    role: '/hr/benefits/salary',
                    showInMenu: true 
                }
            }
        ]
    }
];
