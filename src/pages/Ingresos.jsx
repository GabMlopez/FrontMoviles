import React, { useState } from 'react';
import { useIngresos } from '../hooks/UseIngreso';
import { useAuth } from '../context/AuthContext';
import FormularioMovimiento from '../components/FormularioMovimiento';
import ConfirmModal from '../components/ConfirmModal'; // ← Importamos el modal
import { TrendingUp, PlusCircle, Calendar, DollarSign, Pencil, Trash2 } from 'lucide-react';

const Ingresos = () => {
  const { ingresos, loading, createIngreso, updateIngreso, deleteIngreso } = useIngresos();
  const { clienteId } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleSave = async (data) => {
    const payload = { 
      ...data, 
      idusuario: parseInt(clienteId) 
    };

    if (editData) {
      await updateIngreso(editData.idingreso, payload);
    } else {
      await createIngreso(payload);
    }
    closeModal();
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await deleteIngreso(deleteId);
    }
    setShowConfirm(false);
    setDeleteId(null);
  };

  const openEdit = (ingreso) => {
    setEditData(ingreso);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const totalIngresado = ingresos.reduce((acc, i) => acc + parseFloat(i.valor || 0), 0);

  return (
    <div className="min-h-screen w-full bg-slate-950 p-4 md:p-8">
      {isModalOpen && (
        <FormularioMovimiento 
          tipo="ingreso" 
          datos={editData} 
          onClose={closeModal} 
          onSave={handleSave} 
        />
      )}

      <ConfirmModal 
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        message="¿Estás seguro de eliminar este ingreso?"
      />

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl">
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest">Total Ingresos</p>
            <h2 className="text-4xl font-black text-white flex items-center gap-3">
              <TrendingUp className="text-green-500" size={36} /> 
              ${totalIngresado.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-500 text-white px-8 py-6 rounded-3xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            <PlusCircle size={24}/> REGISTRAR INGRESO
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left text-white">
            <thead className="bg-white/10 text-xs uppercase text-gray-400 font-bold">
              <tr>
                <th className="px-6 py-4">Fuente / Beneficiario</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Monto</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-10 text-gray-500">Cargando ingresos...</td></tr>
              ) : ingresos.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-10 text-gray-500">No hay ingresos registrados</td></tr>
              ) : (
                ingresos.map((ing) => (
                  <tr key={ing.idingreso} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><DollarSign size={18}/></div>
                        <div>
                          <p className="font-bold">{ing.fuente_beneficiario}</p>
                          <p className="text-xs text-gray-500">{ing.descripcion}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-2"><Calendar size={14}/> {ing.fecha}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-green-400">
                      + ${parseFloat(ing.valor).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => openEdit(ing)}
                          className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-xl transition-colors"
                          title="Editar"
                        >
                          <Pencil size={18}/>
                        </button>
                        <button 
                          onClick={() => {
                            setDeleteId(ing.idingreso);
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

export default Ingresos;