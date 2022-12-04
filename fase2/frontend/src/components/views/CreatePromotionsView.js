import React, { useState } from 'react';
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { NavBar } from "../blocks/NavBar";
import cardsIcon from "../../imgs/cards.png";
import cardIcon from "../../imgs/card.png";
import bonusIcon from "../../imgs/bonusIcon.png";
import '../../css/views/CreatePromotionsView.scss'

export const CreatePromotionsView = () => {
    
    return(
        <div>
            <div className='nav-container'>
                <NavBar />
            </div>
            <div className='create-promotion-container'>
                <ul>
                    <button>
                        <img src={bonusIcon} />
                        <p>Oferta bonus</p>
                    </button>
                    <button>
                        <img src={cardsIcon} />
                        <p>Promoções em apostas múltiplas</p>
                    </button>
                    <button>
                        <img src={cardsIcon} />
                        <p>Promoções em apostas combinadas</p>
                    </button>
                    <button>
                        <img src={cardIcon} />
                        <p>Promoções em apostas simples</p>
                    </button>
                </ul>
            </div>
        </div>
    )
}
 