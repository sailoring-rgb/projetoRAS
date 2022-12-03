import { createContext, useEffect, useState } from "react";
import { login, register } from '../utils/authApi'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState()

    const signin = async creds => {
        try {
            const { token, user } = await login(creds)
            localStorage.setItem("user_token", token)
            setUser(user)
        } catch(err) {
            return { status: false,  msg: err }
        }

        return {
            status: true,
        }
    }

    const signup = async (userData) => {
        return await register(userData)
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