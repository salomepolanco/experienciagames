import { useEffect, useState } from 'react';
import { resultadosTerminal } from './ModalTerminal.jsx';

const pistas = [
  'Recuerda: mientras más bajo el p-value, más confiable es esa variable. Busca la que se sale del patrón.',
  'El signo del coeficiente indica la dirección: positivo empuja el resultado hacia arriba, negativo lo empuja hacia abajo.',
  'Un R² cercano a 1 es un ajuste fuerte; cercano a 0 es débil. ¿En qué extremo está el tuyo?',
];

const valoresAjuste = [
  ...new Set([
    ...Object.values(resultadosTerminal).map(({ ajuste }) => ajuste),
    '0.50',
    '0.90',
  ]),
];

const tiposModelo = [
  ...new Set([
    ...Object.values(resultadosTerminal).map(({ tipo }) => tipo),
    'Regresión Lineal (Compra)',
    'Regresión Logística (Monto de venta)',
  ]),
];

const variablesSignificativas = [
  ...new Map(
    Object.values(resultadosTerminal).flatMap(({ variables }) =>
      variables.map((variable) => [
        variable.nombre,
        `${variable.nombre} (p-value: ${variable.pValue})`,
      ]),
    ),
  ).values(),
];

function construirDiales(resultado) {
  const primeraVariable = resultado.variables[0];

  return [
    {
      pregunta: `¿Cuál es el valor de ${resultado.ajusteEtiqueta} del modelo?`,
      respuesta: resultado.ajuste,
      opciones: valoresAjuste,
    },
    {
      pregunta: '¿Qué tipo de modelo entrenaste?',
      respuesta: resultado.tipo,
      opciones: tiposModelo,
    },
    {
      pregunta: '¿Qué p-value tiene la primera variable significativa?',
      respuesta: primeraVariable.pValue,
      opciones: [...new Set([primeraVariable.pValue, '0.01', '0.02', '0.03', '0.04', '0.10'])],
    },
  ];
}

function ModalCandado({ casoNombre, onComplete, onClose }) {
  const [tiempo, setTiempo] = useState(30);
  const [selecciones, setSelecciones] = useState(['', '', '']);
  const [dialesAbiertos, setDialesAbiertos] = useState([false, false, false]);
  const [errores, setErrores] = useState([false, false, false]);
  const [pistaAbierta, setPistaAbierta] = useState(false);
  const [pistaActual, setPistaActual] = useState(-1);
  const resultado = resultadosTerminal[casoNombre];
  const diales = resultado ? construirDiales(resultado) : [];
  const candadoAbierto = dialesAbiertos.every(Boolean);

  useEffect(() => {
    if (candadoAbierto) return undefined;

    const timer = window.setInterval(() => {
      setTiempo((actual) => (actual <= 1 ? 30 : actual - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [candadoAbierto]);

  const actualizarSeleccion = (indice, valor) => {
    setSelecciones((actuales) =>
      actuales.map((seleccion, posicion) =>
        posicion === indice ? valor : seleccion,
      ),
    );
    setErrores((actuales) =>
      actuales.map((error, posicion) => (posicion === indice ? false : error)),
    );
  };

  const confirmarDial = (indice) => {
    if (dialesAbiertos[indice]) return;

    const esCorrecto = selecciones[indice] === diales[indice].respuesta;
    if (!esCorrecto) {
      setErrores((actuales) =>
        actuales.map((error, posicion) => (posicion === indice ? true : error)),
      );
      return;
    }

    const nuevosDiales = dialesAbiertos.map((abierto, posicion) =>
      posicion === indice ? true : abierto,
    );
    setDialesAbiertos(nuevosDiales);
    setErrores((actuales) =>
      actuales.map((error, posicion) => (posicion === indice ? false : error)),
    );

    if (nuevosDiales.every(Boolean)) onComplete?.();
  };

  const mostrarPista = () => {
    setPistaActual((actual) => (actual + 1) % pistas.length);
    setPistaAbierta(true);
  };

  return (
    <section
      aria-label="Escena 5: Candado de resultados"
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
          src={`${import.meta.env.BASE_URL}nivel2/modulo2bucle5.mp4`}
          type="video/mp4"
        />
      </video>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/10" />

      <div className="flex min-h-screen items-center justify-start p-4 pl-[clamp(1rem,8vw,7rem)] sm:pr-8">
        <section
          aria-labelledby="modal-candado-titulo"
          aria-modal="true"
          className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-red-500/80 bg-gray-900/30 p-4 shadow-lg shadow-purple-900/20 backdrop-blur-lg animate-pulse sm:max-h-[calc(100dvh-4rem)] sm:p-5"
          role="dialog"
        >
          {onClose && (
            <button
              aria-label="Cerrar"
              className="absolute right-3 top-2 rounded-full px-3 py-1 text-3xl leading-none text-red-200 transition hover:bg-red-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={onClose}
              type="button"
            >
              ×
            </button>
          )}

          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-red-300">
            Módulo 2 · Escena 5 · Protocolo de escape
          </p>
          <h1
            className="mb-3 pr-8 text-2xl font-black text-white"
            id="modal-candado-titulo"
          >
            La puerta se selló. Solo se abrirá si lees bien tus propios
            resultados.
          </h1>
          <p className="mb-4 text-sm leading-relaxed text-gray-100">
            Tienes 30 segundos. Cada dial es una pregunta sobre tu tabla de
            resultados — léela rápido pero con cuidado.
          </p>

          <div
            aria-label={`Tiempo restante: ${tiempo} segundos`}
            aria-live="off"
            className={`mb-4 rounded-xl border px-4 py-3 text-center font-mono text-xl font-black ${
              tiempo <= 10
                ? 'border-red-400/70 bg-red-950/50 text-red-200'
                : 'border-purple-400/40 bg-gray-950/45 text-purple-100'
            }`}
          >
            {String(Math.floor(tiempo / 60)).padStart(2, '0')}:
            {String(tiempo % 60).padStart(2, '0')}
          </div>

          {resultado ? (
            <div className="space-y-3">
              {diales.map((dial, indice) => (
                <div
                  className={`rounded-2xl border p-3 transition-colors ${
                    dialesAbiertos[indice]
                      ? 'border-green-400/70 bg-green-950/35'
                      : errores[indice]
                        ? 'border-red-400/70 bg-red-950/25'
                        : 'border-white/15 bg-black/25'
                  }`}
                  key={dial.pregunta}
                >
                  <p className="mb-2 text-sm font-semibold text-gray-100">
                    <span className="mr-2 font-mono text-purple-200">
                      DIAL {indice + 1}
                    </span>
                    {dial.pregunta}
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <select
                      aria-label={`Respuesta del dial ${indice + 1}`}
                      className="min-w-0 flex-1 rounded-lg border border-white/20 bg-gray-950/85 px-3 py-2 font-mono text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-60"
                      disabled={dialesAbiertos[indice]}
                      onChange={(event) =>
                        actualizarSeleccion(indice, event.target.value)
                      }
                      value={selecciones[indice]}
                    >
                      <option className="bg-gray-900" value="">
                        Selecciona la respuesta
                      </option>
                      {dial.opciones.map((opcion) => (
                        <option
                          className="bg-gray-900"
                          key={opcion}
                          value={opcion}
                        >
                          {opcion}
                        </option>
                      ))}
                    </select>
                    <button
                      className="rounded-lg border border-cyan-300/50 bg-cyan-500/15 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:bg-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:cursor-default disabled:border-green-400/50 disabled:bg-green-500/15 disabled:text-green-200"
                      disabled={dialesAbiertos[indice]}
                      onClick={() => confirmarDial(indice)}
                      type="button"
                    >
                      {dialesAbiertos[indice] ? 'Abierto ✓' : 'Girar dial'}
                    </button>
                  </div>
                  {errores[indice] && (
                    <p className="mt-2 text-xs text-red-200" role="status">
                      Esa respuesta no coincide. El dial permanece cerrado;
                      inténtalo de nuevo.
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p
              className="rounded-xl border border-red-400/50 bg-red-950/40 p-4 text-sm text-red-100"
              role="alert"
            >
              No hay resultados disponibles para este caso.
            </p>
          )}

          <div className="mt-4 flex justify-end">
            <button
              className="rounded-xl border border-yellow-300/50 bg-yellow-400/10 px-4 py-2 font-bold text-yellow-100 transition hover:bg-yellow-400/20 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onClick={mostrarPista}
              type="button"
            >
              💡 Pista
            </button>
          </div>

          {pistaAbierta && (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-gray-950/80 p-4 backdrop-blur-sm"
              role="presentation"
            >
              <section
                aria-labelledby="pista-candado-titulo"
                aria-modal="true"
                className="w-full rounded-2xl border border-yellow-300/50 bg-gray-900/95 p-5 shadow-xl"
                role="dialog"
              >
                <h2
                  className="mb-3 font-bold text-yellow-200"
                  id="pista-candado-titulo"
                >
                  Pista
                </h2>
                <p className="text-sm leading-relaxed text-gray-100">
                  {pistas[pistaActual]}
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="rounded-lg border border-yellow-300/40 px-3 py-2 text-sm font-semibold text-yellow-100 hover:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    onClick={mostrarPista}
                    type="button"
                  >
                    Otra pista
                  </button>
                  <button
                    className="rounded-lg bg-yellow-400 px-3 py-2 text-sm font-bold text-gray-950 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                    onClick={() => setPistaAbierta(false)}
                    type="button"
                  >
                    Cerrar
                  </button>
                </div>
              </section>
            </div>
          )}

          {candadoAbierto && (
            <p className="mt-4 text-center font-bold text-green-200">
              ¡Candado abierto!
            </p>
          )}
        </section>
      </div>
    </section>
  );
}

export default ModalCandado;
