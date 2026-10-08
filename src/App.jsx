import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

import { SonidoProvider } from './context/SonidoContext.jsx';
import BotonSonido from './components/BotonSonido.jsx';
import Home from './Home.jsx';
import SelectorNiveles from './SelectorNiveles.jsx';
import Nivel0 from './Nivel0.jsx';
import Mision1 from './Mision1.jsx';
import Progreso from './Progreso.jsx';
import Modulo2 from './Modulo2.jsx';

import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase.js'; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // ESTA ES LA LÍNEA QUE FALTABA PARA EVITAR EL ERROR EN ROJO
  const [errorAcceso, setErrorAcceso] = useState(""); 

  // Mantiene la sesión activa al recargar la página
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Consultamos en la colección "accesos" si existe el correo del usuario
          const q = query(collection(db, "accesos"), where("email", "==", currentUser.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // El correo se encontró en la base de datos
            setUser(currentUser);
            setErrorAcceso("");
          } else {
            // El correo NO está en la base de datos
            await signOut(auth);
            setUser(null);
            setErrorAcceso("Tu cuenta no tiene una suscripción activa para esta experiencia.");
          }
        } catch (error) {
          console.error("Error consultando la base de datos:", error);
          setErrorAcceso("Hubo un problema verificando tu acceso. Intenta de nuevo.");
          setUser(null);
        } finally {
          // ESTO GARANTIZA QUE LA PANTALLA DE CARGA SIEMPRE DESAPAREZCA
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Pantalla de carga mientras Firebase verifica la sesión
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white text-xl font-bold">
        Cargando experiencia...
      </div>
    );
  }

  // Pantalla de Login - Versión Final Premium
  if (!user) {
    return (
      <div className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-between py-12">
        
        {/* Fondo animado de Video */}
        <div className="absolute inset-0 z-0 bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-90"
          >
            <source src={`${import.meta.env.BASE_URL}loginbucle.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
        </div>

        {/* PARTE SUPERIOR: Título y Hook */}
        <div className="relative z-10 flex flex-col items-center mt-8 md:mt-12">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 tracking-tighter drop-shadow-2xl">
            ExperienciaIA
          </h1>
          <p className="mt-4 text-gray-200 text-sm md:text-base font-medium tracking-wide bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
            Descubre el poder de los datos jugando
          </p>
        </div>

        {/* PARTE INFERIOR: Mensaje de Error, Botón y Footer */}
        <div className="relative z-10 flex flex-col items-center w-full mb-4">
          
          {/* AQUÍ SE MOSTRARÁ EL MENSAJE SI EL CORREO NO ESTÁ EN LA BASE DE DATOS */}
          {errorAcceso && (
            <div className="mb-6 px-6 py-3 bg-red-900/80 border border-red-500/50 rounded-xl backdrop-blur-md text-red-200 text-sm md:text-base font-medium shadow-2xl text-center max-w-md animate-pulse">
              {errorAcceso}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="group flex items-center gap-4 px-8 py-4 bg-white rounded-full text-gray-900 font-extrabold text-lg shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:bg-gray-50 hover:shadow-[0_10px_50px_rgba(250,204,21,0.4)] transition-all duration-300 ease-out transform hover:-translate-y-2 mb-8"
          >
            <img 
              src="https://www.svgrepo.com/show/475656/google-color.svg" 
              alt="Google" 
              className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" 
            />
            <span className="tracking-wide">Ingresar a la Experiencia</span>
          </button>

          {/* Footer de créditos */}
          <div className="text-white/40 text-xs font-mono tracking-widest uppercase flex gap-3 items-center">
            <span>v1.0.0</span>
            <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
            <span>Desarrollado por Salomé</span>
          </div>
        </div>

      </div>
    );
  }

  // Interfaz principal de la aplicación cuando ya inició sesión
  return (
    <SonidoProvider>
      <BotonSonido />
      
      {/* Cabecera de usuario flotante */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3 bg-black/60 p-2 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
        <img 
          src={user.photoURL} 
          alt="Perfil" 
          className="w-10 h-10 rounded-full border-2 border-white" 
        />
        <span className="text-white font-medium pr-2 hidden md:block">
          {user.displayName}
        </span>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
        >
          Salir
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/niveles" element={<SelectorNiveles />} />
        <Route path="/nivel0" element={<Nivel0 />} />
        <Route path="/mision1" element={<Mision1 />} />
        <Route path="/nivel2" element={<Modulo2 />} />
        <Route path="/progreso" element={<Progreso />} />
      </Routes>
    </SonidoProvider>
  );
}

export default App;