import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pull the freshest profile (including enrolledCourses) from the server.
  // Rejects when the request fails so callers can render an error state; the
  // cached user in state/localStorage is left untouched.
  const refreshUser = useCallback(async () => {
    const res = await api.get("/user/me");
    const fresh = res.data;
    setUser(fresh);
    localStorage.setItem("user", JSON.stringify(fresh));
    return fresh;
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (token) {
      refreshUser()
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/user/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    refreshUser().catch(() => {});
    return res.data.user;
  };

  const register = async (name, email, password, role) => {
    const res = await api.post("/user/register", {
      name,
      email,
      password,
      role,
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    refreshUser().catch(() => {});
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
