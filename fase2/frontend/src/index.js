import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import { StateProvider } from "./state";
import { initialState, globalStateReducer } from "./globalState";
import { App } from "./components/views/App";
import { SignInView } from "./components/views/SingInView";
import { SignUpView } from "./components/views/SingUpView";
import { AuthProvider } from "./utils/auth";
import { BetStateView }  from "./components/views/BetStateView";
import { ManageNotificationsView }  from "./components/views/ManageNotificationsView";
import { CreatePromotionsView } from "./components/views/CreatePromotionsView";
import { CreateGameView } from "./components/views/CreateGameView";
import { RemoveGameView } from "./components/views/RemoveGameView";
import { ChangeOddView } from "./components/views/ChangeOddView";
import { InsertOddView } from "./components/views/InsertOddView";
import { AdminFunctionsView } from "./components/views/AdminFunctionsView";
import { EspFunctionsView } from "./components/views/EspFunctionsView";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/tenis" />,
    },
    {
        path: "/todos",
        // element: <GamesListView game={'football'} />,
        element: <App type={"game"} game={"football"} />,
    },
    {
        path: "/football",
        element: <App type={"game"} game={"football"} />,
        // element: <GamesListView game={'football'} />,
    },
    {
        path: "/basketball",
        element: <App type={"game"} game={"basketball"} />,
        // element: <GamesListView game={'basketball'} />,
    },
    {
        path: "/tenis",
        element: <App type={"game"} game={"tenis"} />,
        // element: <GamesListView game={'tenis'} />,
    },
    {
        path: "/motogp",
        element: <App type={"game"} game={"motoGP"} />,
        // element: <GamesListView game={'motoGP'} />,
    },
    {
        path: "/functions",
        element: <App type={"functions"} game={""} />,
    },
    {
        path: "/functions/notifications",
        element: <App type={"notifications"} game={""} />,
    },
    {
        path: "/functions/mybets",
        element: <App type={"bets"} game={""} />,
    },
    {
        path: "/functions/profile",
        element: <App type={"profile"} game={""} />,
    },
    {
        path: "/functions/mytransactions",
        element: <App type={"transactions"} game={""} />,
    },
    {
        path: "/signin",
        element: <SignInView />,
    },
    {
        path: "/signup",
        element: <SignUpView />,
    },
    /*{
        path: "/createGame",
        element: <CreateGameView />,
    },
    {
        path: "/createPromotions",
        element: <CreatePromotionsView />,
    },*/
    {
        path: "/adminFunctions",
        element: <App type={"adminFunctions"} game={""} />,
        //element: <AdminFunctionsView />
    },
    {
        path: "/espFunctions",
        element: <App type={"espFunctions"} game={""} />,
        //element: <EspFunctionsView />
    },
    {
        path: "/adminFunctions/betState",
        //element: <App type={"betState"} game={""} />,
        element : <BetStateView />,
    },
    {
        path: "/adminFunctions/manageNotifications",
        //element: <App type={"manageNotifications"} game={""} />,
        element : <ManageNotificationsView />,
    },
    {
        path: "/adminFunctions/createPromotions",
        //element: <App type={"createPromotions"} game={""} />,
        element: <CreatePromotionsView />,
    },
    {
        path: "/espFunctions/addGame",
        //element: <App type={"addGame"} game={""} />,
        element: <CreateGameView />,
    },
    {
        path: "/espFunctions/removeGame",
        //element: <App type={"removeGame"} game={""} />,
        element: <RemoveGameView />,
    },
    {
        path: "/espFunctions/changeOdd",
        //element: <App type={"changeOdd"} game={""} />,
        element: <ChangeOddView />,
    },
    {
        path: "/espFunctions/insertOdd",
        //element: <App type={"insertOdd"} game={""} />,
        element: <InsertOddView />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={globalStateReducer}>
            <AuthProvider children={<RouterProvider router={router} />} />
        </StateProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
