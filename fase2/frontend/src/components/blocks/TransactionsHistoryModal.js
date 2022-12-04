import React from "react";
import { TransactionCard } from "../items/TransactionCard.js";
import "../../css/blocks/TransactionsHistoryModal.scss";
//import { Transaction } from "../../models/Transaction.js";"";

export const TransactionsHistoryModal = ({ 
    transactionsList,
    //ssetTransactionsList,
    closeModal,
 }) => {

    /*
    const depositValue = (value,date) => {
        //falta a questão do saldo
        const newTransaction = new Transaction('deposit',value,date)
        transactionsList.put(newTransaction)
        setTransactionsList(transactionsList)
    }

    const withdrawValue = (value,date) =>{
        //falta a questão do saldo
        const newTransaction = new Transaction('withdraw',value,date)
        transactionsList.put(newTransaction)
        setTransactionsList(transactionsList)
    }*/

    return (
        <div className="transactions-history-modal-container" onClick={closeModal}>
            <div
                className="transactions-history-modal-main"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Histórico de Transações</h2>
                <div className="transactions-modal">
                    {transactionsList && Object.values(transactionsList).length > 0 ? (
                        Object.values(transactionsList).map((transaction, i) => (
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