import { useState } from 'react';

const configuracionAraña = {
  'Carrito Fantasma': {
    dependiente: 'Compra',
    independientes: [
      'precio_descuento',
      'metodo_pago_Tarjeta',
      'pais_usuario_Peru',
      'dia_semana_5',
      'dia_semana_6',
    ],
    objetos: [
      '🛒 Compra',
      '🏷️ precio_descuento',
      '💳 metodo_pago_Tarjeta',
      '🌎 pais_usuario_Peru',
      '📅 dia_semana_5',
      '📅 dia_semana_6',
      '🧑 nombre_usuario',
    ],
  },
  'Gamers Dormidos': {
    dependiente: 'Churn',
    independientes: [
      'minutos_jugados',
      'emails_abiertos',
      'clicks_campanas',
      'pais_usuario_Ecuador',
    ],
    objetos: [
      '💤 Churn',
      '🎮 minutos_jugados',
      '✉️ emails_abiertos',
      '🖱️ clicks_campanas',
      '🌎 pais_usuario_Ecuador',
      '🧑 nombre_usuario',
    ],
  },
  'Promoción Mal Dirigida': {
    dependiente: 'Monto de venta',
    independientes: ['vistas', 'compra', 'canal_IG', 'tiempo_sesion'],
    objetos: [
      '💰 Monto de venta',
      '👁️ vistas',
      '🛍️ compra',
      '📱 canal_IG',
      '⏱️ tiempo_sesion',
      '🧑 nombre_usuario',
    ],
  },
};

function ModalArana({ casoNombre, onComplete, onClose }) {
  const [armada, setArmada] = useState(false);
  const araña = configuracionAraña[casoNombre];

  return (
    <section
      aria-label="Escena 3: Araña de variables"
      className="fixed inset-0 z-50 isolate overflow-y-auto bg-black/10 text-white"
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
          src={`${import.meta.env.BASE_URL}nivel2/modulo2bucle3.mp4`}
          type="video/mp4"
        />
      </video>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/10" />

      <div className="flex min-h-screen items-center justify-start p-4 pl-[clamp(1rem,8vw,7rem)] sm:pr-8">
        <section
          aria-labelledby="modal-arana-titulo"
          aria-modal="true"
          className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-purple-500/50 bg-gray-900/30 p-4 shadow-lg shadow-purple-900/20 backdrop-blur-lg sm:max-h-[calc(100dvh-4rem)] sm:p-5"
          role="dialog"
        >
          {onClose && (
            <button
              aria-label="Cerrar"
              className="absolute right-3 top-2 rounded-full px-3 py-1 text-3xl leading-none text-purple-200 transition hover:bg-purple-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              onClick={onClose}
              type="button"
            >
              ×
            </button>
          )}

          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">
            Módulo 2 · Escena 3
          </p>
          <h1
            className="mb-4 pr-8 text-2xl font-black text-white"
            id="modal-arana-titulo"
          >
            Trabajando con: {casoNombre}.
          </h1>
          <p className="mb-5 text-sm leading-relaxed text-gray-100">
            Arrastra cada objeto del banco hacia la zona correcta: el que
            representa lo que quieres predecir va en 'Variable dependiente';
            los que te ayudan a predecirlo van en 'Variables independientes'.
            No todos los objetos deben usarse.
          </p>

          {araña ? (
            <>
              <div className="rounded-2xl border border-cyan-400/40 bg-gray-950/45 p-4">
                <h2 className="mb-4 text-center font-mono text-sm font-bold uppercase tracking-wider text-cyan-200">
                  Araña del modelo
                </h2>
                <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <div className="flex min-h-24 flex-wrap content-center justify-center gap-2 rounded-xl border border-dashed border-cyan-400/50 bg-cyan-950/20 p-3">
                    {armada ? (
                      araña.independientes.map((variable) => (
                        <span
                          className="rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-2 py-1 font-mono text-xs text-cyan-100"
                          key={variable}
                        >
                          {variable}
                        </span>
                      ))
                    ) : (
                      <span className="text-center text-xs text-gray-300">
                        Variables independientes
                      </span>
                    )}
                  </div>
                  <span aria-hidden="true" className="hidden text-2xl text-purple-300 sm:block">
                    ⟶
                  </span>
                  <div className="flex min-h-24 flex-col items-center justify-center rounded-xl border border-dashed border-purple-400/60 bg-purple-950/20 p-3 text-center">
                    <span className="mb-2 font-mono text-[10px] uppercase tracking-wider text-purple-200">
                      Variable dependiente
                    </span>
                    <span className="rounded-lg border border-purple-400/50 bg-purple-500/15 px-3 py-2 font-bold text-purple-100">
                      {armada ? araña.dependiente : '¿Qué predecimos?'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/15 bg-black/25 p-4">
                <h2 className="mb-3 font-mono text-sm font-bold uppercase tracking-wider text-yellow-200">
                  Banco de objetos
                </h2>
                <div className="flex flex-wrap gap-2">
                  {araña.objetos.map((objeto) => (
                    <span
                      className="rounded-xl border border-white/15 bg-gray-950/55 px-3 py-2 text-xs text-gray-100"
                      key={objeto}
                    >
                      {objeto}
                    </span>
                  ))}
                </div>
                <button
                  className="mt-4 w-full rounded-xl border border-cyan-300/50 bg-cyan-500/15 px-4 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                  onClick={() => setArmada(true)}
                  type="button"
                >
                  {armada ? 'Araña armada ✓' : 'Simular armado correcto'}
                </button>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  className="rounded-xl bg-yellow-400 px-5 py-3 font-extrabold text-gray-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!armada}
                  onClick={() =>
                    onComplete?.({
                      dependiente: araña.dependiente,
                      independientes: araña.independientes,
                    })
                  }
                  type="button"
                >
                  Siguiente ▶
                </button>
              </div>
            </>
          ) : (
            <p
              className="rounded-xl border border-red-400/50 bg-red-950/40 p-4 text-sm text-red-100"
              role="alert"
            >
              No hay una araña configurada para este caso.
            </p>
          )}
        </section>
      </div>
    </section>
  );
}

export default ModalArana;
