// src/pages/Login.jsx (o donde lo tengas)
import { useLogin } from '../hooks/UseLogin';
import { Mail, Lock, LogIn, Chrome, Facebook } from 'lucide-react';
import stonksBg from '../assets/stonks.png';
import { GoogleLogin } from '@react-oauth/google';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'; 

const Login = () => {
  const {
    correo,
    setCorreo,
    contrasenia,
    setContrasenia,
    error,
    loading,
    handleEmailLogin,
    handleGoogleLogin,
    handleFacebookLogin,
  } = useLogin();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-fixed bg-no-repeat px-4 relative"
      style={{ backgroundImage: `url(${stonksBg})` }}
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Finences</h2>
          <p className="text-gray-600 mt-2">Inicia tu gestión Web</p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-5">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Correo</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="email@ejemplo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="******"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                required
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs border border-red-100 font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <LogIn size={20} />
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="relative flex py-6 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-gray-400 text-xs font-bold uppercase">O</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="space-y-4">
          {/* Google */}
          <GoogleLogin
            onSuccess={(credentialResponse) => handleGoogleLogin(credentialResponse.credential)}
            onError={() => console.log('Google Login Failed')}
            useOneTap={false}
            theme="filled_black"
            text="signin_with"
            shape="rectangular"
            logo_alignment="left"
            width="100%"
          />

          {/* Facebook - usando render prop para mejor control de estilos */}
         {/* <FacebookLogin
            appId={import.meta.env.VITE_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={(response) => {
              if (response.status === 'connected' || response.accessToken) {
                handleFacebookLogin(response.accessToken);
              } else {
                console.log('Facebook login no completado', response);
              }
            }}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.isProcessing || loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold rounded-2xl transition-all shadow-md disabled:opacity-60"
              >
                <Facebook size={20} />
                {loading ? 'Cargando...' : 'Continuar con Facebook'}
              </button>
            )}
          />*/}
        </div>
      </div>
    </div>
  );
};

export default Login;