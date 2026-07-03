import { createContext, useContext, useState } from "react";

// 1. Create the context
const AuthContext = createContext(null);

// 2. The Provider — wraps the whole app and holds the auth state
export const AuthProvider = ({ children }) => {
  // Read initial state from localStorage so the user stays logged in on refresh
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  // Called after a successful login API response
  const login = ({userData, userToken}) => {
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

// 3. Custom hook — any component can call useAuth() to read/change auth state
export const useAuth = () => useContext(AuthContext);
