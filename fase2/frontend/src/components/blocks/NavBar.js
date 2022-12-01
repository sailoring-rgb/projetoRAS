import '../../css/blocks/NavBar.scss'
import { Link } from "react-router-dom";
import userButton from '../../imgs/user_button.png'
import React from 'react';
import { useState } from "react"
import ReactDOM from 'react-dom';
//import Modal from 'react-modal';

export const NavBar = ({
    //setDisplayUserFunctions,
}) => {
    const isSelected = (path) => path === window.location.pathname
    const [open, setOpen] = React.useState(false);

    /*const openUserFunctions = () => {
        setDisplayUserFunctions(true)
    }*/

    function openModal() {
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
    }

    return (
        <nav> 
            <h2>RasBet</h2>

            <ul>
                <li className={isSelected('/todos') ? 'selected' : ''}>
                    <Link to={`/todos`}>Todos</Link>
                </li>
                <li className={isSelected('/football') ? 'selected' : ''}>
                    <Link to={`/football`}>Futebol</Link>
                </li>
                <li className={isSelected('/basketball') ? 'selected' : ''}>
                    <Link to={`/basketball`}>Basquetebol</Link>
                </li>
                <li className={isSelected('/tenis') ? 'selected' : ''}>
                    <Link to={`/tenis`}>Ténis</Link>
                </li>
                <li className={isSelected('/motogp') ? 'selected' : ''}>
                    <Link to={`/motogp`}>MotoGP</Link>
                </li>
                <label>Bem vindo, Carlos</label> 
                <li onClick={openModal}>
                    <img src={userButton} />
                </li>
            </ul>
        </nav>
    )
}