
import React from 'react';
import { ProfileCard } from '../items/ProfileCard';
import "../../css/views/ProfileModal.scss";

export const ProfileView = () => { 
    const user = {
            id: "fnrjnrf",
            nome: "João",
            apelido: "Gonçalves",
            birthday: "24/12/1992",
            password: "",
            email: "joaoGonçalves@gmail.com",
            NIC: "123456789",
            NIF: "987654321", 
            wallet: "3.0",          
    }   

    return (
        <div className="profile-container">
            <h2>Informações de Perfil</h2>
            <div className="profile-modal">
                <ProfileCard
                        key={user.id}
                        user={user}
                />
            </div>
            <div className="deposit-withdraw-modal">
                <button>Levantar</button>
                <button>Depositar</button>

            </div>
        </div>
    )
}