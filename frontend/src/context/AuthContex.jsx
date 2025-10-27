import React, { useState, createContext, useContext, useEffect } from "react";

import { loginMutation, signupMutation } from '../graphql/gqlMutation.js';
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const parse = (v) => {
        try {
            return v ? JSON.parse(v) : null;
        } catch {
            return null;
        }
    };
    const initialUser = parse(localStorage.getItem('user'));
    const initialToken = localStorage.getItem('token');

    const [user, setUser] = useState(initialUser);
    const [isAuthenticated, setIsAuthenticated] = useState(!!(initialUser && initialToken));
    const [token, setToken] = useState(initialToken);

    const [logingql, { data: loginData }] = useMutation(loginMutation);
    const [signupgql, { data: signupData }] = useMutation(signupMutation);

    useEffect(() => {
        // ensure state matches storage (in case other tab changed it)
        const u = parse(localStorage.getItem('user'));
        const t = localStorage.getItem('token');
        if (u && t) {
            setUser(u);
            setToken(t);
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
        }
    }, []);

    const login = async (email, password) => {
        const { data } = await logingql({ variables: { email: email, password: password } });
        if (data.login?.success) {
            const { user, token } = data.login;
            setUser(user);
            setToken(token);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
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
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return true;
    };


    return <AuthContext.Provider value={{ user, isAuthenticated, token, login, signup, logout }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}