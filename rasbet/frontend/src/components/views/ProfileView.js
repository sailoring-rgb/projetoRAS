import React, { useState } from 'react';
// import '../../css/views/BetStateView.scss'
import '../../css/views/FormView.scss'
import { Input } from '../items/Input';
import { ProfileCard } from '../items/ProfileCard';
import "../../css/blocks/ProfileModal.scss";

export const ProfileView = () => {
    const [ firstName, setFirstName] = useState('')
    const [ lastName, setLastName] = useState('')
    const [ birthday, setMorada] = useState('')
    const [ error, setError ] = useState("")
    
    return (
        <div className="profile-container">
            <h2>Informações de Perfil</h2>
            <div className="profile-modal">
                {notificationsList && notificationsList.length > 0
                ? notificationsList.map(notification => (
                    <ProfileCard
                        key={notification.id}
                        notification={notification}
                    /> )
                ) : (
                    <dic className="no-notifications-label">
                        <hr className="solid"></hr>
                        <p>Sem notificações</p>
                    </dic>
                )}
            </div>
        </div>
    )
}