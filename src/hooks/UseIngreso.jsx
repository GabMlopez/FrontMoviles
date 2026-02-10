import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useIngresos = () => {
  const { token, clienteId } = useAuth();
  const [ingresos, setIngresos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchIngresos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/ingresos/user/${clienteId}`);
      const data = await response.json();
      setIngresos(data.ingresos || []);
    } catch (error) {
      console.error("Error en ingresos:", error);
    } finally {
      setLoading(false);
    }
  };

  const createIngreso = async (data) => {
    await fetch(`${API_BASE_URL}/ingresos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, idusuario: parseInt(clienteId) })
    });
    fetchIngresos();
  };

  const updateIngreso = async (id, data) => {
    await fetch(`${API_BASE_URL}/ingresos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, idusuario: parseInt(clienteId) })
    });
    fetchIngresos();
  };

  const deleteIngreso = async (id) => {
    await fetch(`${API_BASE_URL}/ingresos/${id}`, { method: 'DELETE' });
    fetchIngresos();
  };

  useEffect(() => {
    if (clienteId) fetchIngresos();
  }, [clienteId]);

  return { ingresos, loading, refetch: fetchIngresos, createIngreso, updateIngreso, deleteIngreso };
};