import "../../css/items/ProfileCard.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ProfileCard = ({ user }) => {
    return (
        <div className="profile-card">
            <div className="Nome">
                <p>{user.firstName}h</p>
            </div>
            <div className="Apelido">
                <p>{user.lastName}h</p>
            </div>
            <div className="Data de nascimento">
                <p>{user.birthday}h</p>
            </div>
            <div className="NIF">
                <p>{user.nif}h</p>
            </div>
            <div className="NIC">
                <p>{user.nic}h</p>
            </div>
        </div>
    );
};
