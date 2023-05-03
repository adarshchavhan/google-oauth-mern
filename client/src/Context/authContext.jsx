import { createContext, useState } from "react";
import axios from 'axios'

export const server = import.meta.env.VITE_BASE_URL;

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = async() => {
        window.open(`${server}/auth/google`, '_self');
    }

    const loadUser = async() => {
        try {
            const {data} = await axios.get(`${server}/auth/me`, {
                withCredentials: true
            });
            setCurrentUser(data.user);
        } catch (error) {
            console.log(error.response?.data.message);
        }
    }

    const logout = async() => {
        try {
            const {data} = await axios.get(`${server}/auth/logout`, {
                withCredentials: true
            });
            setCurrentUser(null);
        } catch (error) {
            console.log(error.response?.data.message);
        }
    }

    return(
        <AuthContext.Provider value={{currentUser, login, loadUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}