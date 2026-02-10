import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const FormularioMovimiento = ({ tipo, datos, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    valor: '',
    fecha: new Date().toISOString().split('T')[0],
    medio_de_pago: 'Efectivo',
    descripcion: '',
    estado: 'confirmado',
    fuente_beneficiario: '', 
    acreedor_cobrador: ''   
  });

  // Cuando llegan datos para editar, los cargamos
  useEffect(() => {
    if (datos) {
      setFormData({
        valor: datos.valor || '',
        fecha: datos.fecha || new Date().toISOString().split('T')[0],
        medio_de_pago: datos.medio_de_pago || 'Efectivo',
        descripcion: datos.descripcion || '',
        estado: datos.estado || 'confirmado',
        fuente_beneficiario: datos.fuente_beneficiario || '',
        acreedor_cobrador: datos.acreedor_cobrador || ''
      });
    }
  }, [datos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Limpiamos el objeto según el tipo (evitamos enviar campos vacíos o irrelevantes)
    const dataToSend = {
      valor: parseFloat(formData.valor) || 0,
      fecha: formData.fecha,
      medio_de_pago: formData.medio_de_pago,
      descripcion: formData.descripcion.trim(),
      estado: formData.estado,
    };

    if (tipo === 'ingreso') {
      dataToSend.fuente_beneficiario = formData.fuente_beneficiario.trim();
    } else if (tipo === 'gasto') {
      dataToSend.acreedor_cobrador = formData.acreedor_cobrador.trim();
    }

    onSave(dataToSend);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/20 w-full max-w-md rounded-3xl p-6 text-white shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold uppercase tracking-tighter">
            {datos ? 'Editar' : 'Nuevo'} {tipo}
          </h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Monto */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Monto</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
            />
          </div>

          {/* Fuente / Acreedor */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
              {tipo === 'ingreso' ? 'Fuente / Beneficiario' : 'Acreedor / Cobrador'}
            </label>
            <input
              type="text"
              required
              placeholder={tipo === 'ingreso' ? "Ej: Salario Nómina, Freelance..." : "Ej: Supermaxi, Netflix..."}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={tipo === 'ingreso' ? formData.fuente_beneficiario : formData.acreedor_cobrador}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [tipo === 'ingreso' ? 'fuente_beneficiario' : 'acreedor_cobrador']: e.target.value
                })
              }
            />
          </div>

          {/* Descripción (nuevo campo) */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Descripción</label>
            <textarea
              rows={2}
              placeholder="Ej: Compras semanales / Pago mensual enero 2026"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />
          </div>

          {/* Fecha y Medio de pago */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Fecha</label>
              <input
                type="date"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Medio de pago</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.medio_de_pago}
                onChange={(e) => setFormData({ ...formData, medio_de_pago: e.target.value })}
              >
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Depósito">Depósito</option>
              </select>
            </div>
          </div>

          {/* Botón Guardar */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Save size={20} />
            Guardar Registro
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioMovimiento;