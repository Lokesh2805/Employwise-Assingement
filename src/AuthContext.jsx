// AuthContext.jsx
import React, { createContext, useState, useContext } from "react";
import { motion } from "framer-motion";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("token") || ""
  );

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem("token", token);
    //console.log(window.localStorage.getItem("token"));
  };

  const logout = () => {
    setAuthToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
    <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >{children}</motion.div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
