"use client"

import { createContext, useState, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const signup = (userData) => {
    // userData: { name, email, password, bio }
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const login = (email, password) => {
    // Simple validation - in real app, verify against backend
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.email === email && userData.password === password) {
        setUser(userData)
        setIsAuthenticated(true)
        return true
      }
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  const updateProfile = (updatedData) => {
    // updatedData: { name, bio, profileImage } - NOT email
    const updated = { ...user, ...updatedData }
    setUser(updated)
    localStorage.setItem("user", JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
