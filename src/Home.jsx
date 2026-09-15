import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSonido } from './context/SonidoContext.jsx';

const videos = {
  introvideo1: '/intro/introvideo1.mp4',
  buclevideo1: '/intro/introbucle1.mp4',
};

const MODULOS = [
  { id: 0, etiqueta: 'M0', ruta: '/nivel0', bloqueado: false },
  { id: 1, etiqueta: 'M1', ruta: '/mision1', bloqueado: false },
  { id: 2, etiqueta: 'M2', ruta: null, bloqueado: true },
  { id: 3, etiqueta: 'M3', ruta: null, bloqueado: true },
  { id: 4, etiqueta: 'M4', ruta: null, bloqueado: true },
];

function Home() {
  const navigate = useNavigate();
  const { isMuted } = useSonido();
  const [videoActual, setVideoActual] = useState('introvideo1');

  const finDeVideo = {
    introvideo1: () => setVideoActual('buclevideo1'),
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <video
        key={videoActual}
        src={videos[videoActual]}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted={isMuted}
        playsInline
        controls={false}
        loop={videoActual === 'buclevideo1'}
        onEnded={finDeVideo[videoActual]}
      />

      {videoActual === 'buclevideo1' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
          <div className="bg-black/70 backdrop-blur-md border border-cyan-500/50 p-8 rounded-2xl max-w-2xl text-white text-center shadow-[0_0_40px_rgba(6,182,212,0.3)]">
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] mb-4">
              Bienvenido al Programa Ciencia de Datos Gamificado
            </h1>
            <p className="text-gray-300 leading-relaxed mb-8">
              Por Experienc-IA. Para dominar el análisis, deberás completar 5
              módulos estratégicos. Cada traje en el armario representa un
              nuevo nivel de conocimiento. Debes superar el módulo anterior
              para desbloquear el siguiente.
            </p>

            <button
              onClick={() => navigate('/nivel0')}
              className="bg-cyan-500 text-black font-bold text-xl uppercase tracking-wider px-10 py-4 rounded-full hover:bg-cyan-400 transition-transform hover:scale-105 shadow-[0_0_25px_rgba(6,182,212,0.6)]"
            >
              🚀 Iniciar Ruta Completa
            </button>

            <div className="flex items-center gap-4 my-6 text-gray-500 text-sm uppercase tracking-widest">
              <div className="flex-1 h-px bg-gray-600" />
              <span>o selecciona tu nivel</span>
              <div className="flex-1 h-px bg-gray-600" />
            </div>

            <div className="flex gap-4 justify-center mt-6">
              {MODULOS.map(({ id, etiqueta, ruta, bloqueado }) => (
                <button
                  key={id}
                  disabled={bloqueado}
                  onClick={() => !bloqueado && navigate(ruta)}
                  className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg border font-bold text-sm transition-colors ${
                    bloqueado
                      ? 'border-gray-700 bg-black/40 text-gray-600 opacity-50 cursor-not-allowed'
                      : id === 0
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20'
                        : 'border-yellow-400 bg-yellow-400/10 text-yellow-300 hover:bg-yellow-400/20'
                  }`}
                >
                  {bloqueado ? '🔒' : etiqueta}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
