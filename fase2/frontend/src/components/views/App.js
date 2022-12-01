// import '../../css/views/App.css';
import GamesListView from "./GamesListView";
import { NavBar } from "../blocks/NavBar";
import "../../css/index.scss";
import NotificationsModalView from "./NotificationsModalView";
import FunctionsView from "./FunctionsView";
import BetsHistoryView from "./BetsHistoryView";
import TransactionsHistoryView from "./TransactionsHistoryView";

export const App = ({ type, game }) => {
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
            ) : (
                <TransactionsHistoryView />
            )}
        </main>
    );
};
