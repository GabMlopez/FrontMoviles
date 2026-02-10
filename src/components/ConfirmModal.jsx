import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-6 shadow-2xl">
        <p className="text-white text-center font-medium text-lg">{message}</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;