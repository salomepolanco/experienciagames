import { useNavigate } from 'react-router-dom';

const MAPA_NIVELES = [
  { titulo: 'Nivel 0: Pilares de la IA', completado: true },
  { titulo: 'Nivel 1: Cazadores del Dolor', completado: true },
  { titulo: 'Nivel 2: ???', completado: false },
  { titulo: 'Nivel 3: ???', completado: false },
];

function Progreso() {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen min-h-screen bg-black flex flex-col items-center justify-center px-6 py-16 gap-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-widest uppercase drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]">
        Nivel 1 Completado
      </h1>
      <p className="text-gray-400 max-w-md">
        Has cruzado hacia lo desconocido. El resto de Experienc-IA sigue
        esperando...
      </p>

      <div className="flex flex-col gap-3 w-full max-w-md mt-4">
        {MAPA_NIVELES.map(({ titulo, completado }) => (
          <div
            key={titulo}
            className={`flex items-center justify-between border rounded-lg px-4 py-3 ${
              completado
                ? 'border-yellow-400/50 bg-yellow-400/10 text-yellow-400'
                : 'border-gray-700 bg-black/40 text-gray-500'
            }`}
          >
            <span>{titulo}</span>
            <span>{completado ? '✅' : '🔒'}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/niveles')}
        className="mt-6 bg-yellow-400 text-black font-bold px-8 py-3 rounded-full uppercase tracking-wider hover:bg-yellow-300 transition-colors"
      >
        Volver al Mapa de Niveles
      </button>
    </div>
  );
}

export default Progreso;
