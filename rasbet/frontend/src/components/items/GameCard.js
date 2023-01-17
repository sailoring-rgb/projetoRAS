import { OddCard } from "./OddCard";
import "../../css/items/GameCard.scss";
import { followGame } from "../../utils/gamesApi";

export const GameCard = ({ game, onOddClick, followGameClick, showOdds=true, showFollow=true }) => {
    const parseTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const currDate = new Date();
        const currDayString = `${currDate.getDate()}/${currDate.getMonth()}/${currDate.getFullYear()}`;
        const dayString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        const hourString = `${String(date.getHours()).padStart(
            2,
            "0"
        )}:${String(date.getMinutes()).padStart(2, "0")}`;

        return currDayString === dayString
            ? `Hoje  ${hourString}`
            : `${dayString}  ${hourString}`;
    };

    const toggleFollow = async () => {
        const res = await followGame(game.id)
        if(res.status)
            followGameClick(game.id, res.isFollowed)
    }

    return (
        <div className="game-card">
            <div className="id-labels">
                <label className="main-label">
                    {game.homeTeam} - {game.awayTeam}
                </label>
                <label className="secondary-label">
                    {parseTimestamp(game.commenceTime)}h
                </label>
                {
                    showFollow &&
                    <button
                        onClick={toggleFollow}
                        className={game.isFollowed ? 'followed' : ''}>
                        { !game.isFollowed ? 'Seguir' : 'Não seguir' }
                    </button>
                }
                
            </div>

            {
                showOdds && 
                    <div className="odds-list">
                        {game.odds &&
                            game.oddsKey &&
                            Object.values(game.odds).map((odd) => (
                                <OddCard
                                    key={`${game.oddsKey}_${odd.name}`}
                                    odd={odd}
                                    onClick={() => onOddClick(game.id, odd)}
                                />
                            ))}
                    </div>
            }
        </div>
    );
};
