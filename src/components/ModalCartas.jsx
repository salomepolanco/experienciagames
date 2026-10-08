import { useEffect, useState } from 'react';

export const datosCartas = {
  'Carrito Fantasma': [
    {
      pregunta:
        '¿Un jugador que agrega un juego al carrito terminará comprando o no?',
      respuesta: {
        supervisado: 'Sí',
        modelo: 'Clasificación',
        variable: 'Compra (sí/no)',
        horizonte: '1',
      },
    },
    {
      pregunta: '¿Cuánto gastará un cliente en la tienda el próximo mes?',
      respuesta: {
        supervisado: 'Sí',
        modelo: 'Regresión',
        variable: 'Monto de gasto mensual',
        horizonte: '1',
      },
    },
    {
      pregunta: 'Método de pago',
      trampa: true,
      respuesta: {
        supervisado: 'No aplica',
        modelo: 'No aplica',
        variable: 'No aplica',
        horizonte: 'No aplica',
      },
    },
  ],
  'Gamers Dormidos': [
    {
      pregunta: '¿Qué factores predicen que un suscriptor abandonará su plan?',
      respuesta: {
        supervisado: 'Sí',
        modelo: 'Clasificación',
        variable: 'Churn (abandona sí/no)',
        horizonte: '1',
      },
    },
    {
      pregunta:
        '¿Qué grupos de jugadores tienen comportamientos de juego similares?',
      respuesta: {
        supervisado: 'No',
        modelo: 'Clustering',
        variable: 'No aplica',
        horizonte: '2',
      },
    },
    {
      pregunta: 'Fecha de registro',
      trampa: true,
      respuesta: {
        supervisado: 'No aplica',
        modelo: 'No aplica',
        variable: 'No aplica',
        horizonte: 'No aplica',
      },
    },
  ],
  'Promoción Mal Dirigida': [
    {
      pregunta: '¿Una campaña digital llevó a compra o solo a clics?',
      respuesta: {
        supervisado: 'Sí',
        modelo: 'Clasificación',
        variable: 'Conversión (sí/no)',
        horizonte: '1',
      },
    },
    {
      pregunta:
        '¿Qué juego recomendar a un cliente según sus descargas previas y las de otros?',
      respuesta: {
        supervisado: 'No',
        modelo: 'Recomendador',
        variable: 'No aplica',
        horizonte: '2',
      },
    },
    {
      pregunta: 'Nombre de usuario',
      trampa: true,
      respuesta: {
        supervisado: 'No aplica',
        modelo: 'No aplica',
        variable: 'No aplica',
        horizonte: 'No aplica',
      },
    },
  ],
};

const opciones = {
  supervisado: ['Sí', 'No', 'No aplica'],
  modelo: ['Clasificación', 'Regresión', 'Clustering', 'Recomendador', 'No aplica'],
  variable: [
    'Compra (sí/no)',
    'Monto de gasto mensual',
    'Churn (abandona sí/no)',
    'Conversión (sí/no)',
    'No aplica',
  ],
  horizonte: ['1', '2', '3', '4', 'No aplica'],
};

const campos = [
  { id: 'supervisado', etiqueta: '¿Supervisado?' },
  { id: 'modelo', etiqueta: 'Modelo' },
  { id: 'variable', etiqueta: 'Variable dependiente' },
  { id: 'horizonte', etiqueta: 'Horizonte' },
];

const respuestasIniciales = {
  supervisado: '',
  modelo: '',
  variable: '',
  horizonte: '',
};

const leyendasAyuda = [
  'Supervisado: Ya tenemos ejemplos pasados con la respuesta correcta. Sirve para predecir un resultado conocido',
  'No supervisado: No hay una respuesta correcta previa. Sirve para descubrir patrones',
  'Clasificación: Predice una categoría o un sí/no',
  'Regresión: Predice un número o cantidad',
  'Clustering: Agrupa elementos parecidos entre sí',
  'Recomendador: Sugiere ítems según similitud',
];

const pistas = [
  "Si la carta menciona un dato como nombre, fecha o método de pago, probablemente sea la carta trampa de tu mazo → 'No aplica'.",
  "Si la pregunta empieza con '¿Cuánto…?' o pide un número, casi siempre es Regresión.",
  "Si la pregunta es '¿… o no?', casi siempre es Clasificación.",
];

function SelectCampo({ campo, respuesta, valor, intento, onChange }) {
  const opcionesCampo = opciones[campo.id];
  const incorrecto = intento && valor !== respuesta[campo.id];

  return (
    <label className="block text-sm font-semibold text-gray-100" htmlFor={`carta-${campo.id}`}>
      {campo.etiqueta}
      <select
        aria-invalid={Boolean(incorrecto)}
        className={`mt-2 w-full rounded-xl border bg-gray-950/80 px-3 py-3 text-white outline-none transition focus:ring-2 ${
          incorrecto
            ? 'border-red-400 focus:ring-red-400'
            : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/60'
        }`}
        id={`carta-${campo.id}`}
        onChange={(event) => onChange(campo.id, event.target.value)}
        value={valor}
      >
        <option disabled value="">
          Selecciona una opción
        </option>
        {opcionesCampo.map((opcion) => (
          <option className="bg-gray-900" key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    </label>
  );
}

function ModalCartas({ casoNombre, onComplete, onClose }) {
  const [visible, setVisible] = useState(true);
  const [indiceCarta, setIndiceCarta] = useState(0);
  const [respuestas, setRespuestas] = useState(respuestasIniciales);
  const [intento, setIntento] = useState(false);
  const [correcta, setCorrecta] = useState(false);
  const [pista, setPista] = useState('');
  const [ayudaAbierta, setAyudaAbierta] = useState(false);
  const [mazoCompletado, setMazoCompletado] = useState(false);

  const nombreCaso = casoNombre?.trim();
  const cartas = nombreCaso
    ? datosCartas[nombreCaso]
    : undefined;
  const carta = cartas?.[indiceCarta];

  useEffect(() => {
    setIndiceCarta(0);
    setRespuestas(respuestasIniciales);
    setIntento(false);
    setCorrecta(false);
    setPista('');
    setMazoCompletado(false);
  }, [casoNombre]);

  const cerrar = () => {
    setVisible(false);
    onClose?.();
  };

  const actualizarRespuesta = (campo, valor) => {
    setRespuestas((actuales) => ({ ...actuales, [campo]: valor }));
    if (intento) {
      setIntento(false);
      setCorrecta(false);
      setPista('');
    }
  };

  const confirmar = (event) => {
    event.preventDefault();
    if (!carta) return;

    const esCorrecta = campos.every(
      ({ id }) => respuestas[id] === carta.respuesta[id],
    );
    setIntento(true);
    setCorrecta(esCorrecta);
    setPista(
      esCorrecta
        ? ''
        : pistas[Math.floor(Math.random() * pistas.length)],
    );
  };

  const avanzar = () => {
    if (!correcta || !cartas) return;

    if (indiceCarta === cartas.length - 1) {
      setMazoCompletado(true);
      onComplete?.();
      return;
    }

    setIndiceCarta((actual) => actual + 1);
    setRespuestas(respuestasIniciales);
    setIntento(false);
    setCorrecta(false);
    setPista('');
  };

  if (!visible) return null;

  return (
    <section
      aria-label="Escena 2: Construcción del modelo"
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
          src={`${import.meta.env.BASE_URL}nivel2/modelo2bucle2.mp4`}
          type="video/mp4"
        />
      </video>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/15" />

      <div
        aria-labelledby="modal-cartas-titulo"
        aria-modal="true"
        className="relative z-10 my-auto max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-cyan-400/60 bg-gray-900/35 p-4 shadow-lg shadow-purple-900/20 backdrop-blur-lg sm:max-h-[calc(100dvh-4rem)] sm:p-5"
        role="dialog"
      >
        <button
          aria-label="Cerrar"
          className="absolute right-3 top-2 rounded-full px-3 py-1 text-3xl leading-none text-cyan-200 transition hover:bg-cyan-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onClick={cerrar}
          type="button"
        >
          ×
        </button>

        <div className="mb-6 flex items-start justify-between gap-4 pr-10">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-purple-300">
              Laboratorio de minería de datos · Escena 2
            </p>
            <h1
              className="text-2xl font-black text-white sm:text-3xl"
              id="modal-cartas-titulo"
            >
              Retomando tu caso: {casoNombre || 'Sin caso'}. Vas a construir su
              modelo.
            </h1>
          </div>
          <div
            className="relative shrink-0"
            onMouseEnter={() => setAyudaAbierta(true)}
            onMouseLeave={() => setAyudaAbierta(false)}
          >
            <button
              aria-expanded={ayudaAbierta}
              aria-label="Ayuda sobre tipos de aprendizaje y modelos"
              className="group rounded-full border border-yellow-300/70 bg-yellow-400/10 px-3 py-1 font-black text-yellow-200 transition hover:bg-yellow-400/20 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onClick={() => setAyudaAbierta(true)}
              type="button"
            >
              ?
            </button>
            {ayudaAbierta && (
              <aside
                className="absolute right-0 top-12 z-20 w-72 rounded-2xl border border-yellow-300/50 bg-gray-950/95 p-4 text-xs leading-relaxed text-gray-100 shadow-2xl sm:w-80"
              >
                <ul className="space-y-2">
                  {leyendasAyuda.map((leyenda) => (
                    <li key={leyenda}>{leyenda}</li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </div>

        <p className="mb-5 leading-relaxed text-gray-200">
          Cada carta trae una pregunta de negocio real de tu caso. Decide: ¿es
          supervisado?, ¿qué modelo usarías?, ¿cuál sería la variable
          dependiente?, ¿en qué horizonte cae? Confirma para ver tu resultado.
        </p>

        {!cartas ? (
          <div
            className="rounded-xl border border-red-400/70 bg-red-950/50 p-4 text-red-100"
            role="alert"
          >
            No hay un mazo configurado para “{casoNombre || 'este caso'}”.
            Revisa el nombre del caso.
          </div>
        ) : mazoCompletado ? (
          <div
            className="rounded-2xl border border-green-400/70 bg-green-950/40 p-6 text-center"
            role="status"
          >
            <p className="text-xl font-bold text-green-200">
              Mazo completado. ¡Modelo armado correctamente!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-200">
                Pregunta de negocio
              </h2>
              <span className="rounded-full border border-purple-400/50 bg-purple-500/15 px-3 py-1 font-mono text-xs text-purple-200">
                Carta {indiceCarta + 1} de {cartas.length}
              </span>
            </div>
            <p className="mb-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-lg font-semibold leading-relaxed text-white">
              {carta.pregunta}
            </p>

            <form
              className={`space-y-5 rounded-2xl border p-4 transition-colors sm:p-5 ${
                correcta
                  ? 'border-green-400 bg-green-950/20'
                  : intento
                    ? 'border-red-400/70 bg-red-950/10'
                    : 'border-white/15 bg-black/20'
              }`}
              onSubmit={confirmar}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {campos.map((campo) => (
                  <SelectCampo
                    campo={campo}
                    intento={intento}
                    key={campo.id}
                    onChange={actualizarRespuesta}
                    respuesta={carta.respuesta}
                    valor={respuestas[campo.id]}
                  />
                ))}
              </div>

              {intento && (
                <div
                  aria-live="polite"
                  className={`rounded-xl border p-3 text-sm font-semibold leading-relaxed ${
                    correcta
                      ? 'border-green-400/50 bg-green-500/10 text-green-200'
                      : 'border-red-400/50 bg-red-500/10 text-red-200'
                  }`}
                  role="status"
                >
                  {correcta
                    ? 'Vas bien encaminado — ya resolviste una parte. Revisa el resto antes de continuar.'
                    : 'Algo no cuadra todavía en este modelo. Vuelve a la carta y ajústalo — puedes intentar las veces que necesites.'}
                </div>
              )}

              {pista && (
                <p className="rounded-xl border border-yellow-400/40 bg-yellow-400/10 p-3 text-sm leading-relaxed text-yellow-100">
                  <span className="font-bold text-yellow-300">Pista: </span>
                  {pista}
                </p>
              )}

              <div className="flex flex-wrap justify-end gap-3">
                {correcta ? (
                  <button
                    className="rounded-xl bg-yellow-400 px-5 py-3 font-extrabold text-gray-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                    onClick={avanzar}
                    type="button"
                  >
                    {indiceCarta === cartas.length - 1
                      ? 'Terminar mazo ▶'
                      : 'Siguiente carta ▶'}
                  </button>
                ) : (
                  <button
                    className="rounded-xl border border-cyan-300/70 bg-cyan-500/20 px-5 py-3 font-extrabold text-cyan-100 transition hover:bg-cyan-500/35 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    type="submit"
                  >
                    Confirmar
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default ModalCartas;
