import React, { useState } from 'react';
import { useGastos } from '../hooks/UseGastos';
import { useAuth } from '../context/AuthContext';
import FormularioMovimiento from '../components/FormularioMovimiento';
import ConfirmModal from '../components/ConfirmModal'; // ← Importamos el modal
import { TrendingDown, PlusCircle, Calendar, Receipt, Pencil, Trash2 } from 'lucide-react';

const Gastos = () => {
  const { gastos, refetch } = useGastos();
  const { clienteId, token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gastos`;

  const handleSave = async (data) => {
    const method = editData ? 'PUT' : 'POST';
    const uri = editData ? `${API_URL}/${editData.idgasto}` : API_URL;

    try {
      const response = await fetch(uri, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // Descomenta cuando actives JWT
        },
        body: JSON.stringify({ 
          ...data, 
          idusuario: parseInt(clienteId) 
        })
      });

      if (response.ok) {
        refetch();
        closeModal();
      }
    } catch (error) {
      console.error("Error al procesar gasto:", error);
    }
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await fetch(`${API_URL}/${deleteId}`, { 
          method: 'DELETE',
          headers: { /* 'Authorization': `Bearer ${token}` */ }
        });
        refetch();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
    setShowConfirm(false);
    setDeleteId(null);
  };

  const openEdit = (gasto) => {
    setEditData(gasto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const totalGastado = gastos.reduce((acc, g) => acc + parseFloat(g.valor), 0);

  return (
    <div className="min-h-screen w-full bg-slate-950 p-4 md:p-8">
      {isModalOpen && (
        <FormularioMovimiento 
          tipo="gasto" 
          datos={editData} 
          onClose={closeModal} 
          onSave={handleSave} 
        />
      )}

      <ConfirmModal 
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        message="¿Estás seguro de eliminar este gasto?"
      />

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl">
            <p className="text-red-400 text-xs font-bold uppercase tracking-widest">Total Egresos</p>
            <h2 className="text-4xl font-black text-white flex items-center gap-3">
              <TrendingDown className="text-red-500" size={36} /> 
              ${totalGastado.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 hover:bg-red-500 text-white px-8 py-6 rounded-3xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            <PlusCircle size={24}/> REGISTRAR GASTO
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left text-white">
            <thead className="bg-white/10 text-xs uppercase text-gray-400 font-bold">
              <tr>
                <th className="px-6 py-4">Descripción / Acreedor</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Monto</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {gastos.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-10 text-gray-500">No hay gastos registrados</td></tr>
              ) : (
                gastos.map((gasto) => (
                  <tr key={gasto.idgasto} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg text-red-400"><Receipt size={18}/></div>
                        <div>
                          <p className="font-bold">{gasto.acreedor_cobrador}</p>
                          <p className="text-xs text-gray-500">{gasto.descripcion}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-2"><Calendar size={14}/> {gasto.fecha}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-red-400">
                      - ${parseFloat(gasto.valor).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => openEdit(gasto)}
                          className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-xl transition-colors"
                          title="Editar"
                        >
                          <Pencil size={18}/>
                        </button>
                        <button 
                          onClick={() => {
                            setDeleteId(gasto.idgasto);
                            setShowConfirm(true);
                          }}
                          className="p-2 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Gastos;