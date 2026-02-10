import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGastos = () => {
  const { token, clienteId } = useAuth();
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGastos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/gastos/user/${clienteId}`);
      const data = await response.json();
      setGastos(data.gastos || []);
    } catch (error) {
      console.error("Error en gastos:", error);
    } finally {
      setLoading(false);
    }
  };

  const createGasto = async (data) => {
    await fetch(`${API_BASE_URL}/gastos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, idusuario: parseInt(clienteId) })
    });
    fetchGastos();
  };

  const updateGasto = async (id, data) => {
    await fetch(`${API_BASE_URL}/gastos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, idusuario: parseInt(clienteId) })
    });
    fetchGastos();
  };

  const deleteGasto = async (id) => {
    await fetch(`${API_BASE_URL}/gastos/${id}`, { method: 'DELETE' });
    fetchGastos();
  };

  useEffect(() => {
    if (clienteId) fetchGastos();
  }, [clienteId]);

  return { gastos, loading, refetch: fetchGastos, createGasto, updateGasto, deleteGasto };
};