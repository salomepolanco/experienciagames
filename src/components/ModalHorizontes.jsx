import { useState } from 'react';

const horizontes = [
  {
    nombre: 'H1 — Explotar/Optimizar.',
    estilo: 'border-blue-400 bg-blue-500/20 text-blue-200',
  },
  {
    nombre: 'H2 — Escalar/Expandir.',
    estilo: 'border-orange-400 bg-orange-500/20 text-orange-200',
  },
  {
    nombre: 'H3 — Explorar/Disrupción.',
    estilo: 'border-red-400 bg-red-600/20 text-red-200',
  },
  {
    nombre: 'H4 — Exploración Radical.',
    estilo: 'border-purple-400 bg-purple-500/20 text-purple-200',
  },
];

function ModalHorizontes({ onComplete, onClose }) {
  const [visible, setVisible] = useState(true);

  const cerrar = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <section
      aria-label="Escena 1: Horizontes de innovación"
      className="fixed inset-0 z-50 isolate flex min-h-screen items-center justify-start overflow-y-auto bg-black/10 p-4 pl-[clamp(1rem,8vw,7rem)] text-white sm:pr-8"
    >
      <video
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      >
        <source
          src={`${import.meta.env.BASE_URL}nivel2/modulo2bucle1.mp4`}
          type="video/mp4"
        />
      </video>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/10" />

      <div
        aria-labelledby="modal-horizontes-titulo"
        aria-modal="true"
        className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-purple-500/50 bg-gray-900/30 p-5 shadow-lg shadow-purple-900/20 backdrop-blur-lg sm:max-h-[calc(100dvh-4rem)] sm:p-6"
        role="dialog"
      >
        <button
          aria-label="Cerrar"
          className="absolute right-4 top-3 rounded-full px-3 py-1 text-3xl leading-none text-purple-200 transition hover:bg-purple-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          onClick={cerrar}
          type="button"
        >
          ×
        </button>

        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
          Laboratorio de minería de datos · Escena 1
        </p>
        <h1
          className="mb-5 pr-8 text-2xl font-black text-white sm:text-3xl"
          id="modal-horizontes-titulo"
        >
          Horizontes de innovación
        </h1>

        <p className="mb-6 leading-relaxed text-gray-200">
          No toda idea vive en el mismo horizonte. El Horizonte 1 es mejorar lo
          que ya funciona: menos fricción, más eficiencia. El Horizonte 2 es
          escalar lo que ya probaste, llevarlo a nuevos mercados. El Horizonte
          3 es explorar algo distinto, con potencial de romper las reglas del
          negocio. Y el Horizonte 4 es imaginar futuros que todavía no existen.
          Antes de construir tu modelo, pregúntate: ¿en qué horizonte estoy
          jugando?
        </p>

        <div aria-label="Resumen de horizontes" className="grid gap-3">
          {horizontes.map((horizonte) => (
            <div
              className={`rounded-xl border px-4 py-3 font-bold tracking-wide ${horizonte.estilo}`}
              key={horizonte.nombre}
            >
              {horizonte.nombre}
            </div>
          ))}
        </div>

        <div className="mt-7 flex justify-end">
          <button
            className="rounded-xl border border-yellow-300/70 bg-yellow-400 px-6 py-3 font-extrabold text-gray-950 shadow-[0_0_22px_rgba(250,204,21,0.25)] transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 focus:ring-offset-gray-900"
            onClick={() => onComplete?.()}
            type="button"
          >
            Entendido ▶
          </button>
        </div>
      </div>
    </section>
  );
}

export default ModalHorizontes;
