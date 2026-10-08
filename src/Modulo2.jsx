import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalCartas from './components/ModalCartas.jsx';
import ModalHorizontes from './components/ModalHorizontes.jsx';
import ModalArana from './components/ModalArana.jsx';
import ModalTerminal from './components/ModalTerminal.jsx';
import ModalCandado from './components/ModalCandado.jsx';
import ModalVictoria from './components/ModalVictoria.jsx';

const CASOS = [
  'Carrito Fantasma',
  'Gamers Dormidos',
  'Promoción Mal Dirigida',
];

function Modulo2() {
  const navigate = useNavigate();
  const [casoNombre, setCasoNombre] = useState(CASOS[0]);
  const [escena, setEscena] = useState('inicio');
  const [variablesModelo, setVariablesModelo] = useState(null);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 p-5 text-white">
      {escena === 'inicio' && (
        <section className="w-full max-w-2xl rounded-3xl border border-cyan-400/60 bg-gray-900/80 p-7 text-center shadow-[0_0_40px_rgba(34,211,238,0.2)] backdrop-blur-md sm:p-10">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
            Módulo 2 · Escena 0
          </p>
          <h1 className="mb-4 text-3xl font-black text-white sm:text-4xl">
            Construye un modelo con datos
          </h1>
          <p className="mb-7 leading-relaxed text-gray-300">
            Elige el caso que investigarás. Después explorarás los horizontes
            de innovación y resolverás las cartas de negocio de tu caso.
          </p>

          <label
            className="mx-auto block max-w-md text-left text-sm font-semibold text-gray-100"
            htmlFor="caso-modulo2"
          >
            Tu caso
            <select
              className="mt-2 w-full rounded-xl border border-cyan-400/50 bg-gray-950 px-4 py-3 text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/50"
              id="caso-modulo2"
              onChange={(event) => setCasoNombre(event.target.value)}
              value={casoNombre}
            >
              {CASOS.map((caso) => (
                <option className="bg-gray-900" key={caso} value={caso}>
                  {caso}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              className="rounded-xl border border-white/20 px-5 py-3 font-bold text-gray-200 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              onClick={() => navigate('/')}
              type="button"
            >
              Volver al menú
            </button>
            <button
              className="rounded-xl bg-yellow-400 px-6 py-3 font-extrabold text-gray-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              onClick={() => setEscena('horizontes')}
              type="button"
            >
              Iniciar Módulo 2 ▶
            </button>
          </div>
        </section>
      )}

      {escena === 'horizontes' && (
        <ModalHorizontes
          onComplete={() => setEscena('cartas')}
          onClose={() => setEscena('inicio')}
        />
      )}

      {escena === 'cartas' && (
        <ModalCartas
          casoNombre={casoNombre}
          onComplete={() => setEscena('arana')}
          onClose={() => setEscena('inicio')}
        />
      )}

      {escena === 'arana' && (
        <ModalArana
          casoNombre={casoNombre}
          onComplete={(variables) => {
            setVariablesModelo(variables);
            setEscena('terminal');
          }}
          onClose={() => setEscena('inicio')}
        />
      )}

      {escena === 'terminal' && (
        <ModalTerminal
          casoNombre={casoNombre}
          variables={variablesModelo}
          onComplete={() => setEscena('candado')}
          onClose={() => setEscena('inicio')}
        />
      )}

      {escena === 'candado' && (
        <ModalCandado
          casoNombre={casoNombre}
          onComplete={() => setEscena('victoria')}
          onClose={() => setEscena('inicio')}
        />
      )}

      {escena === 'victoria' && (
        <ModalVictoria
          casoNombre={casoNombre}
          onComplete={() => navigate('/')}
        />
      )}

    </main>
  );
}

export default Modulo2;
