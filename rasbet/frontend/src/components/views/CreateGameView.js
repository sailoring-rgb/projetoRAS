import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/views/FormView.scss'
import { createGame } from '../../utils/gamesApi';
import { Input } from '../items/Input';

export const CreateGameView = () => {
    const [ error, setError ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ newGameData, setNewGameData ] = useState({
        homeTeam: '',
        awayTeam: '',
        commenceTime: '',
        oddAwayTeam: 0.0,
        oddHomeTeam: 0.0,
        oddDrawTeam: 0.0,
        gameType: 'FOOTBALL'
    })

    const updateField = (field, value) => {
        const tmpNewGameData = { ...newGameData }
        if(field.startsWith('odd')) {
            if(isNumber(value))
                tmpNewGameData[field] = value
        }

        tmpNewGameData[field] = value

        setNewGameData(tmpNewGameData)
    }

    const isNumber = (number) => {
        const regex = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
        return regex.test(number)
    }

    const submit = async () => {
        const gameData = { ...newGameData }
        const odds = [
            {
                name: gameData.homeTeam,
                value: parseFloat(gameData.oddHomeTeam)
            },
            {
                name: gameData.awayTeam,
                value: parseFloat(gameData.oddAwayTeam)
            }
        ]

        if(parseFloat(gameData.oddDrawTeam) > 0)
            odds.push({
                name: 'Draw',
                value: gameData.oddDrawTeam
            })

        gameData.odds = odds

        const res = await createGame(gameData)
        if(!res.status) {
            setError(res.message)
            setMessage('')
            return
        }

        setNewGameData({
            homeTeam: '',
            awayTeam: '',
            commenceTime: '',
            oddAwayTeam: 0.0,
            oddHomeTeam: 0.0,
            oddDrawTeam: 0.0,
            gameType: 'FOOTBALL'
        })
        setMessage('Jogo adicionado com sucesso')
        setError('')
    }
    
    return (
        <div className='create-game-container'> 
            <form onSubmit={e => e.preventDefault()}>
                <h1>Adicionar evento desportivo</h1>

                <div className="row">
                    <label for="homeTeam">Home Team:</label>
                    <Input
                        value={newGameData.homeTeam}
                        type="text"
                        placeholder="Equipa que joga em Casa"
                        onChange={(e) => [updateField('homeTeam', e.target.value), setError("")]}
                    />
                </div>

                <div className="row">
                    <label for="awayTeam">Away Team:</label>
                    <Input
                        value={newGameData.awayTeam}
                        type="text"
                        placeholder="Equipa que joga fora de casa"
                        onChange={(e) => [updateField('awayTeam', e.target.value), setError("")]}
                    />
                </div>

                <div className="row">
                    <label for="commenceTime">Início do jogo:</label>
                    <Input
                        value={newGameData.commenceTime}
  m                      type="datetime-local"
                        placeholder="Início do jogo"
                        onChange={(e) => [updateField('commenceTime', e.target.value), setError("")]}
  m                  />
                </div>

                <div className="row">
                    <label>Odd da home team:</label>
                    <Input
                        value={newGameData.oddHomeTeam}
                        type="text"
                        placeholder="Odd home team"
                        onChange={(e) => [updateField('oddHomeTeam', e.target.value), setError("")]}
                    />
                </div>

                <div className="row">
                    <label>Odd da away team:</label>
                    <Input
                        value={newGameData.oddAwayTeam}
                        type="text"
                        placeholder="Odd away team"
                        onChange={(e) => [updateField('oddAwayTeam', e.target.value), setError("")]}
                    />
                </div>

                <div className="row">
                    <label>Odd de empate (Opcional):</label>
                    <Input
                        value={newGameData.oddDraw}
                        type="text"
                        placeholder="Odd empate"
                        onChange={(e) => [updateField('oddDraw', e.target.value), setError("")]}
                    />
                </div>

                <div className="row">
                    <label>Tipo de jogo:</label>
                    <select
                        className='signin-input'
                        value={newGameData.gameType}
                        onChange={e => updateField('gameType', e.target.value)}
                    >
                        <option selected value="FOOTBALL">Football</option>
                        <option value="BASKETBALL">Basketball</option>
                        <option value="TENIS">Tenis</option>
                        <option value="MOTOGP">MotoGP</option>
                    </select>
                </div>


                { error.trim() !== '' && <label className='error-label'>{error}</label>}
                { message.trim() !== '' && <label className='success-label'>{message}</label>}
                <button onClick={submit}>Adicionar</button>
            </form>
        </div>
    )
}