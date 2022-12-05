import { Bet } from "../models/Bet";

export const placeBet = async (bets, payment) => {
    const userToken = localStorage.getItem("user_token")

    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
            bets,
            payment
        })
    }).then(res => res.json());
    return data
}

export const getBetsHistory = async () => {
    const userToken = localStorage.getItem("user_token")

    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bets`, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }).then(res => res.json());

    const bets = data.map(bet => new Bet(bet.game, bet.odd))
    return bets
}