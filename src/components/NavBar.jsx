import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  TrendingUp, 
  TrendingDown, 
  LogOut, 
  Menu, 
  X, 
  Wallet 
} from 'lucide-react';

const Navbar = () => {
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Función para saber si link activo
  const isActive = (path) => location.pathname === path 
    ? "bg-white/20 text-white" 
    : "text-gray-300 hover:bg-white/10 hover:text-white";

  if (!token) return null; 

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Título */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Wallet className="text-white" size={20} />
            </div>
            <span className="text-white font-black tracking-tighter text-xl">
              Finences
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/ingresos" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive('/ingresos')}`}
            >
              <TrendingUp size={18} className="text-green-400" /> Ingresos
            </Link>
            
            <Link 
              to="/gastos" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive('/gastos')}`}
            >
              <TrendingDown size={18} className="text-red-400" /> Gastos
            </Link>

            <div className="h-6 w-[1px] bg-white/20 mx-2"></div>

            <button 
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all cursor-pointer"
            >
              <LogOut size={18} /> Salir
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10 animate-in fade-in slide-in-from-top-4">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/ingresos" 
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-bold ${isActive('/ingresos')}`}
            >
              <div className="flex items-center gap-3"><TrendingUp size={20} /> Ingresos</div>
            </Link>
            <Link 
              to="/gastos" 
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-bold ${isActive('/gastos')}`}
            >
              <div className="flex items-center gap-3"><TrendingDown size={20} /> Gastos</div>
            </Link>
            <button 
              onClick={() => { logout(); setIsOpen(false); }}
              className="w-full text-left px-4 py-3 rounded-xl text-base font-bold text-red-400 hover:bg-red-500/10"
            >
              <div className="flex items-center gap-3"><LogOut size={20} /> Cerrar Sesión</div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;