import React from "react";
import { Routes, Route } from "react-router-dom";

import { ApolloProvider } from '@apollo/client/react';
import { client } from './graphql/gqlClient.js';

import { AuthProvider } from "./context/authContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import { ToastContainer, Slide } from 'react-toastify';

import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css"

function App() {

  return (
    <ApolloProvider client={client} >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
      <AuthProvider>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </ChatProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App;