import { useNavigate } from 'react-router-dom';

const NIVELES = [
  {
    ruta: '/mision1',
    titulo: 'Nivel 1: Cazadores del Dolor',
    descripcion:
      'Investiga el caso real de PlayStation LATAM y limpia el dataset.',
    bloqueado: false,
  },
  {
    ruta: null,
    titulo: 'Nivel 2: Próximamente',
    descripcion: 'Este módulo aún no está disponible.',
    bloqueado: true,
  },
  {
    ruta: null,
    titulo: 'Nivel 3: Próximamente',
    descripcion: 'Este módulo aún no está disponible.',
    bloqueado: true,
  },
  {
    ruta: null,
    titulo: 'Nivel 4: Próximamente',
    descripcion: 'Este módulo aún no está disponible.',
    bloqueado: true,
  },
  {
    ruta: null,
    titulo: 'Nivel 5: Próximamente',
    descripcion: 'Este módulo aún no está disponible.',
    bloqueado: true,
  },
];

function SelectorNiveles() {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen min-h-screen bg-black flex flex-col items-center justify-center px-6 py-16 gap-10">
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 tracking-widest uppercase">
        Selecciona tu Nivel
      </h1>
      <div className="flex flex-col gap-6 w-full max-w-xl">
        {NIVELES.map(({ ruta, titulo, descripcion, bloqueado }) => (
          <button
            key={titulo}
            disabled={bloqueado}
            onClick={() => !bloqueado && navigate(ruta)}
            className={`flex items-center justify-between text-left rounded-xl p-6 border transition-colors ${
              bloqueado
                ? 'bg-black/40 border-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-black/40 backdrop-blur-md border-yellow-400/50 hover:bg-yellow-400/10'
            }`}
          >
            <div>
              <h2
                className={`text-xl font-bold mb-2 ${
                  bloqueado ? 'text-gray-500' : 'text-yellow-400'
                }`}
              >
                {titulo}
              </h2>
              <p className={bloqueado ? 'text-gray-600' : 'text-gray-300'}>
                {descripcion}
              </p>
            </div>
            <span className="text-2xl ml-4">{bloqueado ? '🔒' : '▶️'}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectorNiveles;
