import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Gastos from './pages/Gastos';
import Ingresos from './pages/Ingresos';
import NavBar from './components/NavBar';

const PrivateLayout = () => {
  const { token } = useAuth();
  
  if (!token) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-slate-900"> 
      <NavBar /> 
      
      <main className="pt-20 px-4 pb-10 max-w-7xl mx-auto"> 
        <Outlet /> 
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateLayout />}>
        <Route path="/gastos" element={<Gastos />} />
        <Route path="/ingresos" element={<Ingresos />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;