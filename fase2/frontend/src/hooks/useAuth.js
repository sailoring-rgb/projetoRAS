import { useContext } from "react";
import { AuthContext } from "../utils/auth";

const userAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export default userAuth;