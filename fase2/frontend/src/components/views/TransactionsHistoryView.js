import { useState } from "react";
import { TransactionsHistoryModal } from "../blocks/TransactionsHistoryModal.js";

function TransactionsHistoryView({ closeModal }) {
    const [displayTransactiponsHistoryModal, setDisplayTransactionsHistoryModal] =
        useState(false);

    let transactions = [];
    return (
        <main className="container" onClick={closeModal}>
            <TransactionsHistoryModal
                transactions={transactions}
                closeModal={() => setDisplayTransactionsHistoryModal(false)}
            />
        </main>
    );
}
export default TransactionsHistoryView;
