import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const logIn = async (inputs) => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      inputs
    );
    setCurrentUser(res.data);
  };

  const logOut = async () => {
    await axios.post("http://localhost:3000/api/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <>
      <AuthContext.Provider value={{ currentUser, logIn, logOut }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

export default AuthContextProvider;
