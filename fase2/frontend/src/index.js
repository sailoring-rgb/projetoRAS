import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import { StateProvider } from "./state";
import { initialState, globalStateReducer } from "./globalState";
import NotificationsModalView from "./components/views/NotificationsModalView.js";
import { App } from "./components/views/App";
import { SignInView } from "./components/views/SingInView";
import { useHistory, useLocation } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/todos" />,
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={globalStateReducer}>
            {/* <main className='main-container'>
        <NavBar />
        <div className='main-content'> */}
            <RouterProvider router={router} />
            {/* </div>
      </main> */}
        </StateProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
