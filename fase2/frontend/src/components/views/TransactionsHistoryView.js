import { useState } from "react";
import { TransactionsHistoryModal } from "../blocks/TransactionsHistoryModal.js";

function TransactionsHistoryView({ closeModal }) {

    const [displayTransactionsHistoryModal, setDisplayTransactionsHistoryModal] =
        useState(false);

    const trans = [
        {
            transactionType: "deposit",
            value: "20",
            date: "2022-12-02T19:30:00.000Z",
        },
        {
            transactionType: "withdraw",
            value: "10",
            date: "2022-12-19T12:30:00.000Z",
        },
        {
            transactionType: "deposit",
            value: "100",
            date: "2022-10-09T14:15:00.000Z",
        },
    ];

    const transactions = JSON.stringify(trans);
    const transList = JSON.parse(transactions);

    //const [ transactionsList, setTransactionsList] = useState([])

    return (
        <main className="container" onClick={closeModal}>
            <TransactionsHistoryModal
                transactionsList={transList}
                //setTransactionsList={setTransactionsList}
                closeModal={() => setDisplayTransactionsHistoryModal(false)}
            />
        </main>
    );
}
export default TransactionsHistoryView;
