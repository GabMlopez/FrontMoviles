// src/hooks/UseLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useLogin = () => {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login: authLogin } = useAuth(); 
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        correo,
        contrasenia,
      });

      const { token, user } = response.data;
      authLogin(token, user.idusuario);
      navigate('/gastos');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.mensaje ||
        'Error al iniciar sesión'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (idToken) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/google`, {
        idToken,
      });

      const { token, user } = response.data.data || response.data;

      if (!token || !user?.idusuario) {
        throw new Error('Respuesta inválida del servidor');
      }

      authLogin(token, user.idusuario);
      navigate('/gastos');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.mensaje ||
        'Error al iniciar sesión con Google'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async (accessToken) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/facebook`, {
        accessToken,
      });

      const { token, user } = response.data.data || response.data;

      if (!token || !user?.idusuario) {
        throw new Error('Respuesta inválida del servidor');
      }

      authLogin(token, user.idusuario);
      navigate('/gastos');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.mensaje ||
        'Error al iniciar sesión con Facebook'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    correo,
    setCorreo,
    contrasenia,
    setContrasenia,
    error,
    loading,
    handleEmailLogin,
    handleGoogleLogin,
    handleFacebookLogin,
  };
};