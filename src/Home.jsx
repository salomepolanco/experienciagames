import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSonido } from './context/SonidoContext.jsx';

const BASE = import.meta.env.BASE_URL;

const videos = {
  introvideo1: `${BASE}intro/introvideo1.mp4`,
  buclevideo1: `${BASE}intro/introbucle1.mp4`,
};

const MODULOS = [
  { id: 0, etiqueta: 'M0', ruta: '/nivel0' },
  { id: 1, etiqueta: 'M1', ruta: '/mision1' },
  { id: 2, etiqueta: 'M2', ruta: '/nivel2', disponibleParaPruebas: true },
  { id: 3, etiqueta: 'M3', ruta: null },
  { id: 4, etiqueta: 'M4', ruta: null },
];

function Home() {
  const navigate = useNavigate();
  const { isMuted, volumen } = useSonido();
  const [videoActual, setVideoActual] = useState('introvideo1');
  const [audioAutoplayBloqueado, setAudioAutoplayBloqueado] = useState(false);
  const [skillsDominadas] = useState(() => {
    const progreso = Number(localStorage.getItem('progresoExperiencia') ?? 0);
    return Number.isFinite(progreso)
      ? Math.floor(Math.max(0, Math.min(5, progreso)))
      : 0;
  });
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch((error) => {
      if (error.name === 'NotAllowedError') {
        setAudioAutoplayBloqueado(true);
        return;
      }

      console.error('No se pudo reproducir el video de inicio:', error);
    });
  }, [videoActual]);

  const finDeVideo = {
    introvideo1: () => setVideoActual('buclevideo1'),
  };

  const reanudarAudio = () => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch((error) => {
      console.error('No se pudo activar el audio del video de inicio:', error);
      setAudioAutoplayBloqueado(true);
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <video
        key={videoActual}
        ref={(elemento) => {
          videoRef.current = elemento;
          if (elemento) elemento.volume = volumen;
        }}
        src={videos[videoActual]}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted={isMuted}
        playsInline
        controls={false}
        loop={videoActual === 'buclevideo1'}
        onEnded={finDeVideo[videoActual]}
        onPlaying={() => setAudioAutoplayBloqueado(false)}
      />

      {audioAutoplayBloqueado && (
        <button
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-cyan-300/70 bg-black/80 px-5 py-3 font-bold text-white shadow-lg backdrop-blur-md transition hover:bg-cyan-950"
          onClick={reanudarAudio}
          type="button"
        >
          Toca para activar el audio
        </button>
      )}

      {videoActual === 'buclevideo1' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
          <div className="max-h-[calc(100dvh-3rem)] max-w-2xl overflow-y-auto rounded-2xl border border-cyan-500/50 bg-black/75 p-6 text-center text-white shadow-[0_0_40px_rgba(6,182,212,0.3)] backdrop-blur-md sm:p-8">
            <p className="font-brand mb-3 text-xs uppercase tracking-[0.2em] text-cyan-200 sm:text-sm">
              Bienvenid@ al Reto IA para análisis de Datos Estratégico
            </p>
            <p className="font-brand mb-5 text-sm font-semibold tracking-widest text-cyan-100">
              By ExperienciaIA
            </p>
            <h1 className="mb-4 text-2xl font-black leading-tight text-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] sm:text-3xl">
              5 MÓDULOS. 5 TRAJES. 5 NUEVAS SKILLS.
            </h1>
            <p className="mb-4 leading-relaxed text-gray-200">
              Completa cada módulo para dominar una nueva skill de ciencia de
              datos y desbloquear un traje exclusivo.
            </p>
            <p className="mb-4 font-bold text-cyan-100">
              Supera una misión para acceder a la siguiente.
            </p>
            <p className="mb-5 text-sm text-gray-300">
              1 módulo completado → 1 skill dominada → 1 traje desbloqueado
            </p>

            <div
              aria-live="polite"
              className="mx-auto mb-6 w-fit rounded-full border border-yellow-300/50 bg-yellow-300/10 px-5 py-2 font-bold text-yellow-200"
            >
              {skillsDominadas}/5 skills dominadas
            </div>

            <button
              onClick={() => navigate('/nivel0')}
              className="rounded-full bg-cyan-500 px-7 py-4 text-base font-bold text-black shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-transform hover:scale-105 hover:bg-cyan-400 sm:px-10 sm:text-xl"
            >
              🚀 Comenzar mi primera misión
            </button>

            <div className="flex items-center gap-4 my-6 text-gray-500 text-sm uppercase tracking-widest">
              <div className="flex-1 h-px bg-gray-600" />
              <span>o selecciona tu nivel</span>
              <div className="flex-1 h-px bg-gray-600" />
            </div>

            <h2 className="mb-4 text-sm font-extrabold tracking-[0.2em] text-cyan-200">
              TU ARMARIO DE SKILLS
            </h2>
            <div className="mt-6 flex justify-center gap-1 sm:gap-4">
              {MODULOS.map(({ id, etiqueta, ruta, disponibleParaPruebas }) => {
                const bloqueado =
                  !ruta || (!disponibleParaPruebas && skillsDominadas < id);

                return (
                  <button
                    key={id}
                    aria-label={
                      bloqueado
                        ? `${etiqueta}, misión bloqueada`
                        : `Iniciar ${etiqueta}`
                    }
                    disabled={bloqueado}
                    onClick={() => navigate(ruta)}
                    className={`flex h-10 w-10 flex-col items-center justify-center rounded-lg border font-bold text-xs transition-colors sm:h-16 sm:w-16 sm:text-sm ${
                      bloqueado
                        ? 'cursor-not-allowed border-gray-700 bg-black/40 text-gray-600 opacity-50'
                        : 'border-cyan-400 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20'
                    }`}
                    type="button"
                  >
                    {bloqueado ? '🔒' : etiqueta}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
