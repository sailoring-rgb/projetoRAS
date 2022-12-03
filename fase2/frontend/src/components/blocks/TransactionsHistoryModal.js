import React from "react";
import { TransactionCard } from "../items/TransactionCard.js";
import "../../css/blocks/TransactionsHistoryModal.scss";

export const TransactionsHistoryModal = ({ 
    transactions, 
    closeModal,
 }) => {

    return (
        <div className="transactions-history-modal-container" onClick={closeModal}>
            <div
                className="transactions-history-modal-main"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Histórico de Transações</h2>
                <div className="transactions-modal">
                    {transactions && Object.values(transactions).length > 0 ? (
                        Object.values(transactions).map((transaction, i) => (
                            <TransactionCard key={i} transaction={transaction} />
                        ))
                    ) : (
                        <dic className="no-transactions-label">
                            <hr className="solid"></hr>
                            <p>Sem Transações</p>
                        </dic>
                    )}
                </div>
            </div>
        </div>
    );
};