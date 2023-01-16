import { createContext, useEffect, useState } from "react";
import { login, register } from '../utils/authApi'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState()

    const signin = async creds => {
        try {
            const data = await login(creds)
            if(data.status) {
                const userData = data.user
                localStorage.setItem("user_token", data.token)
                setUser(userData)
                return { status: true, userData }
            } else 
                return {
                    status: data.status,
                    msg: data.message
                }
        } catch(err) {
            return { status: false, msg: err }
        }

    }

    const signup = async (userData) => {
        try {
            const data = await register(userData)
            console.log(data)
            if(!data.status)
                return { status: false,  msg: data.message }
            return data
        } catch(err) {
            return { status: false,  msg: err }
        }
    }

    const signout = () => {
        setUser(null)
        localStorage.removeItem("user_token")
    }

    return (
        <AuthContext.Provider
            value={{
                authUser: user,
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