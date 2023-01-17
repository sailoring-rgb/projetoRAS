import { App } from "../components/views/App";
import { BetsHistoryView } from "../components/views/BetsHistoryView";
import { FunctionsView } from "../components/views/FunctionsView";
import { NotificationsView } from "../components/views/NotificationsView";
import { ProfileView } from "../components/views/ProfileView";
import { TransactionsHistoryView } from "../components/views/TransactionsHistoryView";

export const userRoutes = [
    {
        path: "/user",
        element: <App child={<FunctionsView />} />,
    },
    {
        path: "/user/notifications",
        element: <App child={<NotificationsView />} />,
    },
    {
        path: "/user/mybets",
        element:  <App child={<BetsHistoryView />} />,
    },
    {
        path: "/user/profile",
        element:  <App child={<ProfileView />} />,
    },
    {
        path: "/user/mytransactions",
        element:  <App child={<TransactionsHistoryView />} />,
    },
]