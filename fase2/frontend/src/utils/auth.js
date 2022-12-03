import { createContext, useEffect, useState } from "react";
import { login, register } from '../utils/authApi'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState()

    useEffect(() => {
        const userToken = localStorage.getItem("user_token")
        const userStorage = localStorage.getItem("users_db")
        if(userToken && userStorage) {
            const hasUser = JSON.parse(userStorage)?.filter(
                (user) = user.email == JSON.parse(userToken).email
            )
            if(hasUser) setUser(hasUser[0])
        }
    }, [])

    const signin = async creds => {
        const { token, user } = await login(creds)
        localStorage.setItem("user_token", token)
        setUser(user)

        return "Os dados inseridos não são válidos"
    }

    const signup = async (userData) => {
        const res = await register(userData)
        return res
    }

    const signout = () => {
        setUser(null)
        localStorage.removeItem("user_token")
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signed: !!user,
                signin,
                signup,
                signout
            }}
        >
                {children}
        </AuthContext.Provider>
    )
}