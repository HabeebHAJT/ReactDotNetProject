import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../Layout/App";
import DashboardActivity from "../../Features/activities/dashboard/DashboardActivity";
import ActivityForm from "../../Features/activities/forms/ActivityForm";
import ActivityDetails from "../../Features/activities/details/ActivityDetails";


export const routes: RouteObject[] =
[
    {
        path: '/',
        element: <App />,
        children: [
       
            { path: 'activities', element: <DashboardActivity /> },
            { path: 'activities/:id', element: <ActivityDetails /> },
            { path: 'createActivity', element: <ActivityForm key="create" /> },
            { path: 'manage/:id', element: <ActivityForm key="manage" /> }
        ]
    }


]


export const router = createBrowserRouter(routes);