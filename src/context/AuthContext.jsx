import { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user")) || null
);

const [token, setToken] = useState(
  localStorage.getItem("token") || null
);

  useEffect(() => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
}, [token, user]);

  const register = async (data) => {
  await AuthService.register(data);

  // Immediately login after register
  const response = await AuthService.login({
    email: data.email,
    password: data.password
  });

  setToken(response.token);
  setUser(response.user);
};

  const login = async (data) => {
    const response = await AuthService.login(data);
    setToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }} >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);