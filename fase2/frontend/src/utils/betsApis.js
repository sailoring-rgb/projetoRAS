
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