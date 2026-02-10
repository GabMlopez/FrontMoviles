import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [clienteId, setClienteId] = useState(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('token');
    const savedClienteId = sessionStorage.getItem('clienteId');
    if (savedToken) {
      setToken(savedToken);
      setClienteId(savedClienteId);
    }
  }, []);

  const login = (newToken, newClienteId) => {
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('clienteId', newClienteId);
    setToken(newToken);
    setClienteId(newClienteId);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('clienteId');
    setToken(null);
    setClienteId(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, clienteId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);