import React, { useState, createContext, useContext } from "react";

import { loginMutation, signupMutation } from '../graphql/gqlMutation.js';
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const [logingql, { data: loginData }] = useMutation(loginMutation);
    const [signupgql, { data: signupData }] = useMutation(signupMutation);

    const login = async (email, password) => {
        const { data } = await logingql({ variables: { email: email, password: password } });
        if (data.login?.success) {
            const { user, token } = data.login;
            setUser(user);
            setToken(token);
            setIsAuthenticated(true);
            toast.success("Login Successfull");
            return { success: true, message: 'Login Successfull' };
        } else {
            const { success, message } = data.login;
            toast.error("Login Failed");
            return { success, message };
        }
    }
    const signup = async (name, email, password) => {
        const { data } = await signupgql({ variables: { name: name, email: email, password: password } });
        if (data.signup?.success) {
            const { success, message } = data.signup;
            toast.success(message);
            return { success, message };
        } else {
            const { success, message } = data.signup;
            toast.error(message);
            return { success, message };
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        return true;
    }

    return <AuthContext.Provider value={{ user, isAuthenticated, token, login, signup, logout }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}