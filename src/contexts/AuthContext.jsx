import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { getToken, setToken, removeToken } from "../utils/token";
import { getUserRole } from "../utils/jwt";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [token, setUserToken] = useState(null);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);


    // Load user when app starts
  useEffect(()=>{

    const savedToken = getToken();


    if(savedToken){

        setUserToken(savedToken);


        const userRole = getUserRole(savedToken);

        setRole(userRole);


        const payload = JSON.parse(
            atob(savedToken.split(".")[1])
        );


        const userData = {

            userId:
            payload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ],


            email:
            payload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],


            role:userRole

        };


        setUser(userData);


    }


    setLoading(false);


},[]);



    // Login
const login = async (email, password) => {

    const response = await authService.login({
        email,
        password,
    });

    const token = response.data.token;

    setToken(token);
    setUserToken(token);

    const userRole = getUserRole(token);

    setRole(userRole);

    const userData = {
        email,
        role: userRole,
    };

    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));

    return response.data;
};



    // Register
    const register = async (userData) => {

        const response = await authService.register(userData);

        return response.data;

    };



    // Logout
    const logout = () => {

        removeToken();

        localStorage.removeItem("user");


        setUserToken(null);
        setUser(null);
        setRole(null);

    };



    return (

        <AuthContext.Provider
        value={{
            token,
            user,
            role,
            loading,
            login,
            register,
            logout,
            isAuthenticated: !!token,
        }}
        >

            {children}

        </AuthContext.Provider>

    );

};