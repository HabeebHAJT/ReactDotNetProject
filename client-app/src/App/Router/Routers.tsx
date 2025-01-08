import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../Layout/App";
import DashboardActivity from "../../Features/activities/dashboard/DashboardActivity";
import ActivityForm from "../../Features/activities/forms/ActivityForm";
import ActivityDetails from "../../Features/activities/details/ActivityDetails";
import TestErrors from "../../Features/Errors/TestErrors";
import NotFound from "../../Features/Errors/NotFound";
import ServerError from "../../Features/Errors/ServerError";
import Login from "../../Features/users/Login";


export const routes: RouteObject[] =
[
    {
        path: '/',
        element: <App />,
        children: [
       
            { path: 'activities', element: <DashboardActivity /> },
            { path: 'activities/:id', element: <ActivityDetails /> },
            { path: 'createActivity', element: <ActivityForm key="create" /> },
            { path: 'manage/:id', element: <ActivityForm key="manage" /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'login', element: <Login /> },
            { path: '*', element: <NotFound /> }
        ]
    }


]


export const router = createBrowserRouter(routes);