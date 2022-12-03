import React from "react";
import { BetCard } from "../items/BetCard.js";
import "../../css/blocks/BetsHistoryModal.scss";

export const BetsHistoryModal = ({ bets, closeModal }) => {
    return (
        <div className="bets-history-modal-container" onClick={closeModal}>
            <div
                className="bets-history-modal-main"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Histórico de Apostas</h2>
                <div className="bets-modal">
                    {bets && Object.values(bets).length > 0 ? (
                        Object.values(bets).map((bet, i) => (
                            <BetCard key={i} bet={bet} />
                        ))
                    ) : (
                        <dic className="no-bets-label">
                            <hr className="solid"></hr>
                            <p>Sem Apostas</p>
                        </dic>
                    )}
                </div>
            </div>
        </div>
    );
};

/**
const nextBackButtons = ({ page, typeButton, changeTypeButton }) => {
    return (
        <div className="joint-btn">
            { page === 1 ?
            <>
            <button
                className={betType === BetType.Simple ? "selected" : ""}
                onClick={() => changeBetType(BetType.Simple)}
            >
                next
            </button>
            <button
                className={betType === BetType.Combined ? "selected" : ""}
                onClick={() => changeBetType(BetType.Combined)}
            >
                back
            </button>
            </>
            : page === lastPage ?
            <button
            className={betType === BetType.Simple ? "selected" : ""}
            onClick={() => changeBetType(BetType.Simple)}
        >
            next
        </button>
        : 
        <button
                className={betType === BetType.Combined ? "selected" : ""}
                onClick={() => changeBetType(BetType.Combined)}
            >
                back
            </button>
        }
        </div>
    );
}


const nextOrBackSelection = ({ setPage }) => {

    return (
        <main className="content">
            <div className="img-btn">
                <img src={mbLogo} />
            </div>
            <div className="img-btn" onClick={() => setStep(2)}>
                <img src={mbWayLogo} />
            </div>
            <div className="img-btn">
                <img src={visaMstCardLogo} />
            </div>
        </main>
    );
};
*/
