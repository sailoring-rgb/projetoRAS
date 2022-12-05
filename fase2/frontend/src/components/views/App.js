// import '../../css/views/App.css';
import GamesListView from "./GamesListView";
import { NavBar } from "../blocks/NavBar";
import "../../css/index.scss";
import NotificationsModalView from "./NotificationsModalView";
import FunctionsView from "./FunctionsView";
import BetsHistoryView from "./BetsHistoryView";
import TransactionsHistoryView from "./TransactionsHistoryView";
import BetStateView from "./BetStateView";
import ManageNotificationsView from "./ManageNotificationsView";
import CreatePromotionsView from "./CreatePromotionsView";
import CreateGameView from "./CreateGameView";
import RemoveGameView from "./RemoveGameView";
import ChangeOddView from "./ChangeOddView";
import InsertOddView from "./InsertOddView";
import AdminFunctionsView from "./AdminFunctionsView";
import EspFunctionsView from "./EspFunctionsView";
import { useUserAuth } from "../../hooks/useAuth";
import { useStateValue } from "../../state";
import { validateToken } from "../../utils/authApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const App = ({ type, game }) => {
    const { signout } = useUserAuth()
    const { _, dispatch } = useStateValue()
    const nav = useNavigate()

    const validateTokenRequest = async () => {
        const userData = await validateToken()

        if(userData.message){
            signout()
            dispatch({ type: 'setAuthUser', value: null })
            nav('/signin')
            return
        }

        dispatch({ type: 'setAuthUser', value: userData })
    }

    useEffect(() => {
        validateTokenRequest()
    }, [])

    return (
        <main className="main-container">
            <NavBar />
            {type === "game" ? (
                <div className="main-content">
                    <GamesListView game={game} />
                </div>
            ) : type === "notifications" ? (
                <NotificationsModalView />
            ) : type === "functions" ? (
                <FunctionsView />
            ) : type === "bets" ? (
                <BetsHistoryView />
            ) : type === "betState" ? (
                <BetStateView />
            ) : type === "manageNotifications" ? (
                <ManageNotificationsView />
            ) : type === "createPromotions" ? (
                <CreatePromotionsView />
            ) : type === "addGame" ? (
                <CreateGameView />
            ) : type === "removeGame" ? (
                <RemoveGameView />
            ) : type === "changeOdd" ? (
                <ChangeOddView />
            ) : type === "insert" ? (
                <InsertOddView />
            ) : type === "adminFunctions" ? (
                <AdminFunctionsView />
            ) : type === "espFunctions" ? (
                <EspFunctionsView />
            ) : (
                <TransactionsHistoryView />
            )}
        </main>
    );
};
