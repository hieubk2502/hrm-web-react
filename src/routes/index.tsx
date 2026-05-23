import {createBrowserRouter, Navigate} from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import {ROUTES} from "../constants/routeNames";
import {hrRoutes} from "./routeConfig";

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Navigate to={ROUTES.HR.DASHBOARD} replace/>,
        handle: { title: 'Trang chủ' }
    },
    {
        path: ROUTES.LOGIN,
        element: <Login />,
        handle: { title: 'Đăng nhập' }
    },
    {
        path: ROUTES.HR.ROOT,
        element: <AdminLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <Navigate to={ROUTES.HR.DASHBOARD} replace/>
            },
            ...hrRoutes
        ],
    },
]);
