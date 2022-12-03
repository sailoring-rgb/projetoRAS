
export const login = async creds => {
    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(creds)
    }).then(res => res.json());
    return data
}

export const register = async userData => {
    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(userData)
    }).then(res => res.json());
    return data
}