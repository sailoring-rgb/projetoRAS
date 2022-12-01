import { useState, useEffect, useCallback } from 'react'
import { BetCard } from '../items/BetCard.js'
import { BetTypeButtons } from '../items/BetTypeButtons';
import '../../css/blocks/BetsList.scss'
import { BetType } from '../../models/BetType.js';
// import { useStateValue } from '../../state';

export const UserFunctions = ({closeModal}) => {

    const isSelected = (path) => path === window.location.pathname

    return (
        <div className='user-container'>
            <ul>
                <li className={isSelected('/profile') ? 'selected' : ''}>
                    <Link to={`/profile`}>Perfil</Link>
                </li>
                <li className={isSelected('/notificacions') ? 'selected' : ''}>
                    <Link to={`/notifications`}>Notificacões</Link>
                </li>
                <li className={isSelected('/transactionsList') ? 'selected' : ''}>
                    <Link to={`/transactionsList`}>Histórico de Transações</Link>
                </li>
                <li className={isSelected('/betsList') ? 'selected' : ''}>
                    <Link to={`/betsList`}>Histórico de Aposta</Link>
                </li>
            </ul>
        </div>         
    )/*
    return (
        <main className="functions">
            <div className="perfil">
                <Link to={`/profile`}>Perfil</Link>
            </div>
            <div className="notificatons">
                <Link to={`/notifications`}>Notificacões</Link>
            </div>
            <div className="transactionsList">
                <Link to={`/transactionsList`}>Histórico de Transações</Link>
            </div>
            <div className="betsList">
                <Link to={`/betsList`}>Histórico de Aposta</Link>
            </div>
        </main>
    )*/
}
