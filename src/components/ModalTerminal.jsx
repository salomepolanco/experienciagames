import { useEffect, useState } from 'react';

export const resultadosTerminal = {
  'Carrito Fantasma': {
    tipo: 'Regresión Logística (Compra)',
    ajusteEtiqueta: 'Pseudo R²',
    ajuste: '0.77',
    variables: [
      { nombre: 'precio_descuento', pValue: '0.02', coeficiente: '-0.12' },
      { nombre: 'metodo_pago_Tarjeta', pValue: '0.01', coeficiente: null },
      { nombre: 'pais_usuario_Peru', pValue: '0.03', coeficiente: null },
      { nombre: 'dia_semana_5', pValue: '0.01', coeficiente: null },
      { nombre: 'dia_semana_6', pValue: '0.01', coeficiente: null },
    ],
  },
  'Gamers Dormidos': {
    tipo: 'Regresión Logística (Churn)',
    ajusteEtiqueta: 'Pseudo R²',
    ajuste: '0.83',
    variables: [
      { nombre: 'minutos_jugados', pValue: '0.01', coeficiente: null },
      { nombre: 'emails_abiertos', pValue: '0.01', coeficiente: null },
      { nombre: 'clicks_campanas', pValue: '0.03', coeficiente: null },
      { nombre: 'pais_usuario_Ecuador', pValue: '0.04', coeficiente: null },
    ],
  },
  'Promoción Mal Dirigida': {
    tipo: 'Regresión Lineal (Monto de venta)',
    ajusteEtiqueta: 'R²',
    ajuste: '0.65',
    variables: [
      { nombre: 'vistas', pValue: '0.01', coeficiente: null },
      { nombre: 'compra', pValue: '0.02', coeficiente: null },
      { nombre: 'canal_IG', pValue: '0.03', coeficiente: null },
      { nombre: 'tiempo_sesion', pValue: '0.01', coeficiente: null },
    ],
  },
};

function ModalTerminal({ casoNombre, variables, onComplete, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [videoEnBucle, setVideoEnBucle] = useState(false);
  const resultado = resultadosTerminal[casoNombre];

  useEffect(() => {
    if (!isProcessing) return undefined;

    const timer = window.setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [isProcessing]);

  const ejecutarModelo = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setIsProcessing(true);
    setVideoEnBucle(true);
  };

  return (
    <section
      aria-label="Escena 4: Terminal de resultados"
      className="fixed inset-0 z-50 isolate overflow-y-auto bg-black/10 text-white"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoEnBucle ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <source
            src={`${import.meta.env.BASE_URL}nivel2/modulo2video4.mp4`}
            type="video/mp4"
          />
        </video>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoEnBucle ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source
            src={`${import.meta.env.BASE_URL}nivel2/modulo2bucle4.mp4`}
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="flex min-h-screen items-center justify-start p-4 pl-[clamp(1rem,8vw,7rem)] sm:pr-8">
        <section
          aria-labelledby="modal-terminal-titulo"
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
            Módulo 2 · Escena 4
          </p>
          <h1
            className="mb-4 pr-8 text-2xl font-black text-white"
            id="modal-terminal-titulo"
          >
            Terminal de datos
          </h1>

          {!showResults ? (
            <>
              <p className="mb-4 text-sm leading-relaxed text-gray-100">
                Revisa las variables que aparecen en la terminal — vienen de tu
                araña — y presiona ▶ PLAY para entrenar el modelo. Espera el
                procesamiento y observa la tabla de resultados.
              </p>

              <div className="rounded-2xl border border-cyan-400/40 bg-gray-950/60 p-4 font-mono text-sm text-cyan-100">
                <p className="mb-2 text-xs uppercase tracking-wider text-cyan-300">
                  Variables del modelo
                </p>
                <p>
                  Dependiente:{' '}
                  <span className="text-green-300">
                    {variables?.dependiente || 'Sin seleccionar'}
                  </span>
                </p>
                <p className="mt-2 text-gray-300">Independientes:</p>
                {variables?.independientes?.length ? (
                  <ul className="mt-1 space-y-1 pl-4 text-green-300">
                    {variables.independientes.map((variable) => (
                      <li className="break-all" key={variable}>
                        › {variable}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-yellow-200">› Sin variables</p>
                )}
              </div>

              <p className="my-4 rounded-xl border border-yellow-300/30 bg-yellow-400/10 p-3 text-xs leading-relaxed text-yellow-100">
                💡 No necesitas escribir código: solo confirmar y observar.
                Memoriza el R² y qué variables quedan marcadas como
                significativas — en la siguiente sala los vas a necesitar sin
                ayuda.
              </p>

              {isProcessing ? (
                <div
                  aria-live="polite"
                  className="rounded-xl border border-cyan-400/40 bg-gray-950/70 p-4 font-mono text-sm text-cyan-200"
                  role="status"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
                    Procesando modelo...
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-cyan-950">
                    <div className="h-full w-full origin-left animate-pulse rounded-full bg-cyan-300" />
                  </div>
                </div>
              ) : (
                <button
                  className="w-full rounded-xl border border-cyan-200/70 bg-cyan-400 px-6 py-4 font-mono text-xl font-black tracking-widest text-gray-950 shadow-[0_0_28px_rgba(34,211,238,0.45)] transition hover:bg-cyan-300 hover:shadow-[0_0_38px_rgba(34,211,238,0.65)] focus:outline-none focus:ring-2 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isPlaying || !resultado}
                  onClick={ejecutarModelo}
                  type="button"
                >
                  ▶ PLAY
                </button>
              )}
              {!resultado && (
                <p className="mt-3 text-sm text-red-200" role="alert">
                  No hay resultados configurados para este caso.
                </p>
              )}
            </>
          ) : resultado ? (
            <>
              <div className="mb-4 rounded-xl border border-green-400/40 bg-black/40 p-3 font-mono text-sm text-green-200">
                <p>MODELO: {resultado.tipo}</p>
                <p className="mt-1">
                  {resultado.ajusteEtiqueta}: {resultado.ajuste}
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-green-400/35 bg-gray-950/75">
                <table className="w-full min-w-[28rem] border-collapse text-left font-mono text-xs sm:text-sm">
                  <caption className="px-3 py-3 text-left text-xs uppercase tracking-wider text-cyan-300">
                    Variables significativas · p-value &lt; 0.05
                  </caption>
                  <thead className="border-y border-green-400/30 bg-green-950/50 text-green-200">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Variable</th>
                      <th className="px-3 py-2 font-semibold">p-value</th>
                      <th className="px-3 py-2 font-semibold">Coeficiente</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-green-400/10 text-green-300">
                    {resultado.variables.map((fila) => (
                      <tr key={fila.nombre}>
                        <td className="break-all px-3 py-2">{fila.nombre}</td>
                        <td className="px-3 py-2">{fila.pValue}</td>
                        <td className="px-3 py-2">
                          {fila.coeficiente ?? '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                className="mt-5 w-full rounded-xl bg-yellow-400 px-5 py-3 font-extrabold text-gray-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                onClick={() => onComplete?.()}
                type="button"
              >
                Siguiente ▶
              </button>
            </>
          ) : (
            <p
              className="rounded-xl border border-red-400/50 bg-red-950/40 p-4 text-sm text-red-100"
              role="alert"
            >
              No hay resultados configurados para este caso.
            </p>
          )}
        </section>
      </div>
    </section>
  );
}

export default ModalTerminal;
