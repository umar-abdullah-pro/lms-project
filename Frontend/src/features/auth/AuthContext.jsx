import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

const getInitialUser = () => {
  try {
    const item = localStorage.getItem("user");
    if (item && item !== "undefined") {
      return JSON.parse(item);
    }
    return null;
  } catch (error) {
    console.error("Failed to parse user from local storage:", error);
    localStorage.removeItem("user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  // Read initial state safely from localStorage
  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Called after a successful login API response
  const login = ({ userData, userToken }) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
