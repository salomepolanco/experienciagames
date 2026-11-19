import { useState } from 'react';

const configuracionAraña = {
  'Carrito Fantasma': {
    dependiente: { id: 'compra', nombre: 'Compra', icono: '🛒' },
    independientes: [
      { id: 'precio_descuento', nombre: 'precio_descuento', icono: '🏷️' },
      {
        id: 'metodo_pago_Tarjeta',
        nombre: 'metodo_pago_Tarjeta',
        icono: '💳',
      },
      { id: 'pais_usuario_Peru', nombre: 'pais_usuario_Peru', icono: '🌎' },
      { id: 'dia_semana_5', nombre: 'dia_semana_5', icono: '📅' },
      { id: 'dia_semana_6', nombre: 'dia_semana_6', icono: '📅' },
    ],
    distractores: [
      { id: 'nombre_usuario', nombre: 'nombre_usuario', icono: '🪪' },
      { id: 'id_sesion', nombre: 'id_sesion', icono: '🔑' },
    ],
  },
  'Gamers Dormidos': {
    dependiente: { id: 'churn', nombre: 'Churn', icono: '💤' },
    independientes: [
      { id: 'minutos_jugados', nombre: 'minutos_jugados', icono: '🎮' },
      { id: 'emails_abiertos', nombre: 'emails_abiertos', icono: '✉️' },
      { id: 'clicks_campanas', nombre: 'clicks_campanas', icono: '🖱️' },
      {
        id: 'pais_usuario_Ecuador',
        nombre: 'pais_usuario_Ecuador',
        icono: '🌎',
      },
    ],
    distractores: [
      { id: 'nombre_usuario', nombre: 'nombre_usuario', icono: '🪪' },
      { id: 'fecha_registro', nombre: 'fecha_registro', icono: '📅' },
    ],
  },
  'Promoción Mal Dirigida': {
    dependiente: {
      id: 'monto_venta',
      nombre: 'Monto de venta',
      icono: '💰',
    },
    independientes: [
      { id: 'vistas', nombre: 'vistas', icono: '👁️' },
      { id: 'compra', nombre: 'compra', icono: '🛍️' },
      { id: 'canal_IG', nombre: 'canal_IG', icono: '📱' },
      { id: 'tiempo_sesion', nombre: 'tiempo_sesion', icono: '⏱️' },
    ],
    distractores: [
      { id: 'nombre_usuario', nombre: 'nombre_usuario', icono: '🪪' },
      { id: 'id_sesion', nombre: 'id_sesion', icono: '🔑' },
    ],
  },
};

const ZONAS = {
  dependiente: 'dependiente',
  independientes: 'independientes',
};

function TarjetaVariable({
  variable,
  zona,
  seleccionada,
  alSeleccionar,
  alIniciarArrastre,
  alFinalizarArrastre,
}) {
  return (
    <button
      aria-pressed={seleccionada}
      className={`flex min-h-20 min-w-20 max-w-28 flex-col items-center justify-center gap-1 rounded-xl border p-2 text-center transition ${
        seleccionada
          ? 'border-yellow-300 bg-yellow-400/20 ring-2 ring-yellow-300/50'
          : zona === ZONAS.dependiente
            ? 'border-yellow-300/40 bg-yellow-400/10 hover:border-yellow-300/80'
            : zona === ZONAS.independientes
              ? 'border-cyan-300/40 bg-cyan-500/10 hover:border-cyan-300/80'
              : 'border-white/20 bg-gray-950/45 hover:border-purple-300/70 hover:bg-purple-500/15'
      }`}
      draggable
      onClick={(event) => {
        event.stopPropagation();
        alSeleccionar(variable.id, zona);
      }}
      onDragEnd={alFinalizarArrastre}
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', variable.id);
        alIniciarArrastre(variable.id);
      }}
      type="button"
    >
      <span aria-hidden="true" className="text-xl">
        {variable.icono}
      </span>
      <span className="break-words font-mono text-[10px] leading-tight text-gray-100">
        {variable.nombre}
      </span>
      {zona && (
        <span className="text-[9px] text-gray-300">
          Pulsa para devolver
        </span>
      )}
    </button>
  );
}

function ModalArana({ casoNombre, onComplete, onClose }) {
  const [asignaciones, setAsignaciones] = useState({});
  const [seleccionada, setSeleccionada] = useState(null);
  const [arrastrada, setArrastrada] = useState(null);
  const [validada, setValidada] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const araña = configuracionAraña[casoNombre];

  const objetos = araña
    ? [araña.dependiente, ...araña.independientes, ...araña.distractores]
    : [];
  const idsIndependientesEsperados =
    araña?.independientes.map(({ id }) => id) ?? [];

  const colocarVariable = (id, zona) => {
    if (!id) return;

    setAsignaciones((actuales) => {
      if (!zona) {
        const siguientes = { ...actuales };
        delete siguientes[id];
        return siguientes;
      }

      return { ...actuales, [id]: zona };
    });
    setSeleccionada(null);
    setValidada(false);
    setMensaje('');
  };

  const seleccionarVariable = (id, zonaActual) => {
    if (zonaActual) {
      colocarVariable(id, null);
      return;
    }

    setSeleccionada((actual) => (actual === id ? null : id));
    setMensaje('');
  };

  const iniciarArrastre = (id) => {
    setArrastrada(id);
    setSeleccionada(null);
  };

  const permitirSoltar = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const soltarEnZona = (event, zona) => {
    event.preventDefault();
    event.stopPropagation();
    const id = event.dataTransfer.getData('text/plain') || arrastrada;
    colocarVariable(id, zona);
    setArrastrada(null);
  };

  const usarZonaSeleccionada = (zona) => {
    if (seleccionada) colocarVariable(seleccionada, zona);
  };

  const confirmarAraña = () => {
    const idsAsignados = Object.keys(asignaciones);
    const idsIndependientesAsignados = idsAsignados.filter(
      (id) => asignaciones[id] === ZONAS.independientes,
    );
    const dependienteCorrecta =
      asignaciones[araña.dependiente.id] === ZONAS.dependiente;
    const independientesCorrectas =
      idsIndependientesAsignados.length === idsIndependientesEsperados.length &&
      idsIndependientesEsperados.every((id) =>
        idsIndependientesAsignados.includes(id),
      );
    const sinVariablesEnZonaIncorrecta = idsAsignados.every(
      (id) =>
        (id === araña.dependiente.id &&
          asignaciones[id] === ZONAS.dependiente) ||
        (idsIndependientesEsperados.includes(id) &&
          asignaciones[id] === ZONAS.independientes),
    );

    if (
      dependienteCorrecta &&
      independientesCorrectas &&
      sinVariablesEnZonaIncorrecta
    ) {
      setValidada(true);
      setMensaje('¡Correcto! La araña representa el modelo de este caso.');
      return;
    }

    setValidada(false);
    setMensaje(
      'La estructura todavía no coincide con el modelo. Revisa qué quieres predecir y qué variables ayudan a predecirlo.',
    );
  };

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
          className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-3xl border border-purple-500/50 bg-gray-900/35 p-4 shadow-lg shadow-purple-900/20 backdrop-blur-lg sm:max-h-[calc(100dvh-4rem)] sm:p-5"
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
            Módulo 2 · Escena 3 · Juego: Llena la araña
          </p>
          <h1
            className="mb-3 pr-8 text-2xl font-black text-white"
            id="modal-arana-titulo"
          >
            Trabajando con: {casoNombre}.
          </h1>
          <p className="mb-4 text-sm leading-relaxed text-gray-100">
            Arrastra cada objeto del banco hacia la zona correcta. También
            puedes tocar una tarjeta y luego la zona. La variable dependiente
            es lo que quieres predecir; las independientes ayudan a predecirlo.
            No todos los objetos deben usarse.
          </p>

          {araña ? (
            <>
              <section className="rounded-2xl border border-purple-400/50 bg-purple-950/25 p-3 sm:p-4">
                <h2 className="mb-2 text-center font-mono text-xs font-bold uppercase tracking-[0.15em] text-purple-200 sm:text-sm">
                  Estructura del modelo: {casoNombre}
                </h2>
                <p className="mb-4 text-center text-xs text-gray-200">
                  Toca una tarjeta y luego una zona, o arrástrala directamente.
                </p>

                <div
                  className="mb-4 flex min-h-24 flex-wrap items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-gray-950/25 p-3"
                  onDragOver={permitirSoltar}
                  onDrop={(event) => soltarEnZona(event, null)}
                >
                  {objetos
                    .filter(({ id }) => !asignaciones[id])
                    .map((variable) => (
                      <TarjetaVariable
                        key={variable.id}
                        seleccionada={seleccionada === variable.id}
                        variable={variable}
                        alFinalizarArrastre={() => setArrastrada(null)}
                        alIniciarArrastre={iniciarArrastre}
                        alSeleccionar={seleccionarVariable}
                      />
                    ))}
                  {objetos.every(({ id }) => asignaciones[id]) && (
                    <span className="text-xs text-gray-400">
                      Todas las tarjetas están en una zona. Pulsa una para
                      devolverla al banco.
                    </span>
                  )}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div
                    aria-label="Zona de variable dependiente. Toca para colocar la tarjeta seleccionada."
                    className={`min-h-32 rounded-2xl border-2 border-dashed p-3 transition ${
                      seleccionada
                        ? 'border-yellow-300 bg-yellow-400/10'
                        : 'border-yellow-400/60 bg-yellow-950/15'
                    }`}
                    onClick={() => usarZonaSeleccionada(ZONAS.dependiente)}
                    onDragOver={permitirSoltar}
                    onDrop={(event) =>
                      soltarEnZona(event, ZONAS.dependiente)
                    }
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        usarZonaSeleccionada(ZONAS.dependiente);
                      }
                    }}
                    role="group"
                    tabIndex={0}
                  >
                    <p className="mb-2 text-center text-xs font-bold text-yellow-100">
                      🟡 Variable dependiente
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {objetos
                        .filter(
                          ({ id }) =>
                            asignaciones[id] === ZONAS.dependiente,
                        )
                        .map((variable) => (
                          <TarjetaVariable
                            key={variable.id}
                            seleccionada={false}
                            variable={variable}
                            zona={ZONAS.dependiente}
                            alFinalizarArrastre={() => setArrastrada(null)}
                            alIniciarArrastre={iniciarArrastre}
                            alSeleccionar={seleccionarVariable}
                          />
                        ))}
                    </div>
                  </div>

                  <div
                    aria-label="Zona de variables independientes. Toca para colocar la tarjeta seleccionada."
                    className={`min-h-32 rounded-2xl border-2 border-dashed p-3 transition ${
                      seleccionada
                        ? 'border-cyan-300 bg-cyan-400/10'
                        : 'border-cyan-400/60 bg-cyan-950/15'
                    }`}
                    onClick={() => usarZonaSeleccionada(ZONAS.independientes)}
                    onDragOver={permitirSoltar}
                    onDrop={(event) =>
                      soltarEnZona(event, ZONAS.independientes)
                    }
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        usarZonaSeleccionada(ZONAS.independientes);
                      }
                    }}
                    role="group"
                    tabIndex={0}
                  >
                    <p className="mb-2 text-center text-xs font-bold text-cyan-100">
                      🟢 Variables independientes
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {objetos
                        .filter(
                          ({ id }) =>
                            asignaciones[id] === ZONAS.independientes,
                        )
                        .map((variable) => (
                          <TarjetaVariable
                            key={variable.id}
                            seleccionada={false}
                            variable={variable}
                            zona={ZONAS.independientes}
                            alFinalizarArrastre={() => setArrastrada(null)}
                            alIniciarArrastre={iniciarArrastre}
                            alSeleccionar={seleccionarVariable}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </section>

              {mensaje && (
                <p
                  aria-live="polite"
                  className={`mt-3 rounded-xl border p-3 text-sm ${
                    validada
                      ? 'border-green-400/50 bg-green-500/10 text-green-200'
                      : 'border-yellow-400/40 bg-yellow-400/10 text-yellow-100'
                  }`}
                  role="status"
                >
                  {mensaje}
                </p>
              )}

              <div className="mt-4 flex flex-wrap justify-end gap-3">
                {!validada && (
                  <button
                    className="rounded-xl border border-cyan-300/50 bg-cyan-500/15 px-5 py-3 font-bold text-cyan-100 transition hover:bg-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    onClick={confirmarAraña}
                    type="button"
                  >
                    Confirmar araña ▶
                  </button>
                )}
                <button
                  className="rounded-xl bg-yellow-400 px-5 py-3 font-extrabold text-gray-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!validada}
                  onClick={() =>
                    onComplete?.({
                      dependiente: araña.dependiente.nombre,
                      independientes: araña.independientes.map(
                        ({ nombre }) => nombre,
                      ),
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
