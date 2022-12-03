import { useState } from "react";
import { BetsHistoryModal } from "../blocks/BetsHistoryModal.js";

function BetsHistoryView({ closeModal }) {
    const [displayBetsHistoryModal, setDisplayBetsHistoryModal] =
        useState(false);

    let bets = [];
    return (
        <main className="container" onClick={closeModal}>
            <BetsHistoryModal
                bets={bets}
                closeModal={() => setDisplayBetsHistoryModal(false)}
            />
        </main>
    );
}
export default BetsHistoryView;
