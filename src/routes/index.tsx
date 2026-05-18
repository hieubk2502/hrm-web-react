import {createBrowserRouter, Navigate} from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/hr/Dashboard";
import Budget from "../pages/hr/benefits/Budget";
import NotFound from "../pages/NotFound";
import {PATHS, ROUTES} from "../constants/routeNames";

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Navigate to={ROUTES.HR.DASHBOARD} replace/>
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
            {
                path: PATHS.DASHBOARD,
                element: <Dashboard/>,
            },
            {
                path: PATHS.BENEFITS,
                children: [
                    {
                        index: true,
                        element: <Navigate to={ROUTES.HR.BENEFITS.BUDGET} replace/>
                    },
                    {
                        path: PATHS.BUDGET,
                        element: <Budget/>
                    }
                ]
            }
        ],
    },
]);
