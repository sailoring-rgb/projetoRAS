import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const {user, setUser} = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const userStorage = localStorage.getItem("users_db");
        if(userToken && userStorage) {
            const hasUser = JSON.parse(userStorage)?.filter(
                (user) = user.email == JSON.parse(userToken).email
            );
            if(hasUser) setUser(hasUser[0]);
        }
    }, []);

    const signin = (email, pass, birth, nif, nic, address) => {
        const userStorage = JSON.parse(localStorage.getItem("users_db"));
        const hasUser = userStorage?.filter((user) => user.email === email);
        if(hasUser?.length) {
            if(hasUser[0].email === email && hasUser[0].pass === pass && hasUser[0].birth === birth && hasUser[0].nif === nif && hasUser[0].nic === nic && hasUser[0].address === address) {
                const token = Math.random().toString(36).substring(6);
                localStorage.setItem("uder_token", JSON.stringify({email,token}));
                setUser({email,pass,birth,nif,nic,address});
                return;
            } else {
                return "Os dados inseridos não são válidos"
            }
        } else {
            return "O utilizador não foi registado"
        }
    };

    const signup = (email, pass, birth, nif, nic, address) => {
        const userStorage = JSON.parse(localStorage.getItem("users_db"));
        const hasUser = userStorage?.filter((user) => user.email === email);
        if(hasUser?.length) {
            return "Já existe uma conta com o E-mail introduzido";
        }
        let newUser;
        if(userStorage) {
            newUser = [...userStorage, {email,pass,birth,nif,nic,address}];
        } else {
            newUser = [{email,pass,birth,nif,nic,address}];
        }
        localStorage.setItem("users_db", JSON.stringify(newUser));
        return;
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };

    return (
        <AuthContext.Provider
            value={{user,signed: !!user, signin, signup, signout }} >
                {children}
            </AuthContext.Provider>
    );
};