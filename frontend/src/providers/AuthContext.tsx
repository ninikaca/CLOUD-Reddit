import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect, useMemo } from "react";

interface AuthContextValue {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Token expiration check every minute
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setToken(null);
        clearInterval(interval);
        return;
      }

      const { exp } = jwtDecode(storedToken);
      const expirationTime = (exp ?? 0) * 1000;

      if (expirationTime < Date.now()) {
        logout();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const memoizedToken = useMemo(() => token, [token]);

  const auth: AuthContextValue = {
    token: memoizedToken,
    login,
    logout,
  };

  // Render children only when loading is false
  return (
    <AuthContext.Provider value={auth}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
