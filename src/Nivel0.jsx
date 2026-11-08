import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSonido } from './context/SonidoContext.jsx';

const BASE = import.meta.env.BASE_URL;

const videos = {
  video0: `${BASE}nivel0/video0.mp4`,
  video1: `${BASE}nivel0/video1.mp4`,
  bucle1: `${BASE}nivel0/bucle1.mp4`,
  video2: `${BASE}nivel0/video2.mp4`,
  bucle2: `${BASE}nivel0/bucle2.mp4`,
  video3: `${BASE}nivel0/video3.mp4`,
  bucle3: `${BASE}nivel0/bucle3.mp4`,
  video4: `${BASE}nivel0/video4.mp4`,
  bucle4: `${BASE}nivel0/bucle4.mp4`,
  video5: `${BASE}nivel0/video5.mp4`,
  bucle5: `${BASE}nivel0/bucle5.mp4`,
  video6: `${BASE}nivel0/video6.mp4`,
  video7: `${BASE}nivel0/video7.mp4`,
  video7_1: `${BASE}nivel0/video7_1.mp4`,
  video8: `${BASE}nivel0/video8.mp4`,
  video8_1: `${BASE}nivel0/video8_1.mp4`,
  video9: `${BASE}nivel0/video9.mp4`,
  video10: `${BASE}nivel0/video10.mp4`,
};

const ROLES_PILAR_1 = [
  {
    icono: '🧭',
    grupo: 'Los que hacen que sirva',
    detalle: 'Experto del negocio, Data Analyst.',
    funcion:
      'Conectan los objetivos del negocio con las preguntas correctas y convierten el análisis en decisiones útiles.',
  },
  {
    icono: '🛡️',
    grupo: 'Los que evitan que explote',
    detalle: 'Data Owner, Data Steward, Gestión del Cambio.',
    funcion:
      'Cuidan la calidad, el acceso y la responsabilidad de los datos, y ayudan a que los equipos adopten la solución.',
  },
  {
    icono: '🧰',
    grupo: 'Los que hacen que la data sirva',
    detalle: 'Data Engineer, Especialista de Gobierno.',
    funcion:
      'Integran fuentes, preparan flujos de datos confiables y establecen prácticas para gestionarlos.',
  },
  {
    icono: '🤖',
    grupo: 'Los que hacen los modelos',
    detalle: 'Data Scientist, ML Engineer, AI Engineer, Cloud/DevOps.',
    funcion:
      'Diseñan y evalúan modelos, y preparan la infraestructura para llevarlos a producción.',
  },
];

const CASOS_REALES = [
  {
    id: 'amazon',
    nombre: 'Amazon',
    marca: 'a',
    estilo: 'font-serif text-7xl font-black text-yellow-400',
    audio: 'amazon.mp3',
    resumen:
      'Un sistema de selección aprendió de contrataciones históricas sesgadas y penalizaba currículums con términos asociados a mujeres.',
  },
  {
    id: 'zillow',
    nombre: 'Zillow',
    marca: 'Z',
    estilo: 'text-6xl font-black text-sky-400',
    audio: 'zillow.mp3',
    resumen:
      'Su modelo de valoración no se ajustó con suficiente rapidez a los cambios del mercado y contribuyó a compras de viviendas sobrevaloradas.',
  },
  {
    id: 'ibm',
    nombre: 'IBM',
    marca: 'IBM',
    estilo: 'font-mono text-5xl font-black tracking-tight text-blue-300',
    audio: 'ibm.mp3',
    resumen:
      'Las recomendaciones de Watson Oncology no encajaban bien con los flujos de trabajo reales de los equipos médicos.',
  },
  {
    id: 'mcdonalds',
    nombre: "McDonald's",
    marca: 'M',
    estilo: 'font-sans text-7xl font-black text-yellow-400',
    audio: 'mcdonalds.mp3',
    resumen:
      'La prueba de IA para tomar pedidos en autoservicio se terminó después de errores que dificultaban la experiencia de los clientes.',
  },
];

function Nivel0() {
  const navigate = useNavigate();
  const { isMuted, volumen } = useSonido();
  const audioCasoRef = useRef(null);
  const [videoActual, setVideoActual] = useState('video0');
  const [mostrarTransicion, setMostrarTransicion] = useState(false);
  const [textoTransicion, setTextoTransicion] = useState('');

  const [mostrarModulo1, setMostrarModulo1] = useState(false);
  const [pasoModulo1, setPasoModulo1] = useState(0);
  const [tarjetasGiradas, setTarjetasGiradas] = useState([]);
  const [errorPregunta, setErrorPregunta] = useState(false);
  const [respuestaCorrecta1, setRespuestaCorrecta1] = useState(false);

  const [mostrarModulo2, setMostrarModulo2] = useState(false);
  const [pasoModulo2, setPasoModulo2] = useState(0);
  const [errorPregunta2, setErrorPregunta2] = useState(false);
  const [respuestaCorrecta2, setRespuestaCorrecta2] = useState(false);

  const [mostrarModulo3, setMostrarModulo3] = useState(false);
  const [pasoModulo3, setPasoModulo3] = useState(0);
  const [errorPregunta3, setErrorPregunta3] = useState(false);
  const [respuestaCorrecta3, setRespuestaCorrecta3] = useState(false);

  const [mostrarModulo4, setMostrarModulo4] = useState(false);
  const [pasoModulo4, setPasoModulo4] = useState(0);
  const [errorPregunta4, setErrorPregunta4] = useState(false);
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);
  const [audioCasoError, setAudioCasoError] = useState('');
  const [reintentoAudioCaso, setReintentoAudioCaso] = useState(0);

  const [mostrarModulo5, setMostrarModulo5] = useState(false);
  const [pasoModulo5, setPasoModulo5] = useState(0);
  const [errorPregunta5, setErrorPregunta5] = useState(false);

  const [mostrarModulo6, setMostrarModulo6] = useState(false);
  const [mostrarCierreFinal, setMostrarCierreFinal] = useState(false);
  const [mostrarFinVideo10, setMostrarFinVideo10] = useState(false);

  const casoActivo = CASOS_REALES.find(
    (caso) => caso.id === casoSeleccionado,
  );

  useEffect(() => {
    const audio = audioCasoRef.current;
    if (!audio || !casoActivo) return undefined;

    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.error(`No se pudo reproducir el audio de ${casoActivo.nombre}:`, error);
      setAudioCasoError(
        `No se pudo reproducir el audio. Verifica el archivo public/audios/casos/${casoActivo.audio}.`,
      );
    });

    return () => audio.pause();
  }, [casoActivo, reintentoAudioCaso]);

  const reproducirCaso = (casoId) => {
    setCasoSeleccionado(casoId);
    setAudioCasoError('');
    setReintentoAudioCaso((intento) => intento + 1);
  };

  const manejarContinuarCasos = () => {
    audioCasoRef.current?.pause();
    setCasoSeleccionado(null);
    setAudioCasoError('');
    setPasoModulo4(1);
  };

  const manejarFinVideo0 = () => {
    setMostrarTransicion(true);
    setTextoTransicion('Nivel 0: Conoce el tablero');

    setTimeout(() => {
      setVideoActual('video1');
      setMostrarTransicion(false);
    }, 3000);
  };

  const manejarFinVideo1 = () => {
    setVideoActual('bucle1');
    setMostrarModulo1(true);
  };

  const manejarRespuestaIncorrecta = () => {
    setErrorPregunta(true);
    setTimeout(() => {
      setErrorPregunta(false);
    }, 1000);
  };

  const alternarTarjeta = (indice) => {
    setTarjetasGiradas((tarjetasActuales) =>
      tarjetasActuales.includes(indice)
        ? tarjetasActuales.filter((tarjeta) => tarjeta !== indice)
        : [...tarjetasActuales, indice],
    );
  };

  const manejarRespuestaCorrecta = () => {
    setRespuestaCorrecta1(true);
  };

  const manejarContinuarModulo1 = () => {
    setMostrarModulo1(false);
    setVideoActual('video2');
  };

  const manejarFinVideo2 = () => {
    setVideoActual('bucle2');
    setMostrarModulo2(true);
  };

  const manejarRespuestaIncorrecta2 = () => {
    setErrorPregunta2(true);
    setTimeout(() => {
      setErrorPregunta2(false);
    }, 1000);
  };

  const manejarRespuestaCorrecta2 = () => {
    setRespuestaCorrecta2(true);
  };

  const manejarContinuarModulo2 = () => {
    setMostrarModulo2(false);
    setVideoActual('video3');
  };

  const manejarFinVideo3 = () => {
    setVideoActual('bucle3');
    setMostrarModulo3(true);
  };

  const manejarRespuestaIncorrecta3 = () => {
    setErrorPregunta3(true);
    setTimeout(() => {
      setErrorPregunta3(false);
    }, 1000);
  };

  const manejarRespuestaCorrecta3 = () => {
    setRespuestaCorrecta3(true);
  };

  const manejarContinuarModulo3 = () => {
    setMostrarModulo3(false);
    setVideoActual('video4');
  };

  const manejarFinVideo4 = () => {
    setVideoActual('bucle4');
    setMostrarModulo4(true);
  };

  const manejarRespuestaIncorrecta4 = () => {
    setErrorPregunta4(true);
    setTimeout(() => {
      setErrorPregunta4(false);
    }, 1000);
  };

  const manejarRespuestaCorrecta4 = () => {
    setMostrarModulo4(false);
    setVideoActual('video5');
  };

  const manejarFinVideo5 = () => {
    setVideoActual('bucle5');
    setMostrarModulo5(true);
  };

  const manejarRespuestaIncorrecta5 = () => {
    setErrorPregunta5(true);
    setTimeout(() => {
      setErrorPregunta5(false);
    }, 1000);
  };

  const manejarRespuestaCorrecta5 = () => {
    setMostrarModulo5(false);
    setVideoActual('video6');
  };

  const manejarFinVideo6 = () => {
    setMostrarModulo6(true);
  };

  const manejarCruzarPortal = () => {
    setMostrarModulo6(false);
    setVideoActual('video7');
  };

  const manejarFinVideo7 = () => {
    setVideoActual('video7_1');
  };

  const manejarFinVideo7_1 = () => {
    setVideoActual('video8');
  };

  const manejarFinVideo8 = () => {
    setVideoActual('video8_1');
  };

  const manejarFinVideo8_1 = () => {
    setMostrarCierreFinal(true);
    localStorage.setItem('progresoExperiencia', '1');
  };

  const manejarDemostrarQuePuedo = () => {
    setMostrarCierreFinal(false);
    setVideoActual('video9');
  };

  const manejarFinVideo9 = () => {
    setVideoActual('video10');
  };

  const manejarFinVideo10 = () => {
    setMostrarFinVideo10(true);
  };

  const manejarEntrarFase1 = () => {
    navigate('/niveles');
  };

  const manejarVolver = () => {
    setErrorPregunta(false);
    setErrorPregunta2(false);
    setErrorPregunta3(false);
    setErrorPregunta4(false);
    setErrorPregunta5(false);

    if (mostrarCierreFinal) {
      setMostrarCierreFinal(false);
      setVideoActual('video8_1');
      return;
    }

    if (mostrarFinVideo10) {
      setMostrarFinVideo10(false);
      setVideoActual('video10');
      return;
    }

    if (mostrarModulo6) {
      setMostrarModulo6(false);
      setMostrarModulo5(true);
      setPasoModulo5(2);
      setVideoActual('bucle5');
      return;
    }

    if (mostrarModulo5) {
      if (pasoModulo5 > 0) {
        setPasoModulo5((paso) => paso - 1);
      } else {
        setMostrarModulo5(false);
        setMostrarModulo4(true);
        setPasoModulo4(1);
        setVideoActual('bucle4');
      }
      return;
    }

    if (mostrarModulo4) {
      if (pasoModulo4 > 0) {
        setPasoModulo4((paso) => paso - 1);
      } else {
        audioCasoRef.current?.pause();
        setCasoSeleccionado(null);
        setAudioCasoError('');
        setMostrarModulo4(false);
        setMostrarModulo3(true);
        setPasoModulo3(2);
        setRespuestaCorrecta3(false);
        setVideoActual('bucle3');
      }
      return;
    }

    if (mostrarModulo3) {
      if (pasoModulo3 > 0) {
        setPasoModulo3((paso) => paso - 1);
        setRespuestaCorrecta3(false);
      } else {
        setMostrarModulo3(false);
        setMostrarModulo2(true);
        setPasoModulo2(2);
        setRespuestaCorrecta2(false);
        setVideoActual('bucle2');
      }
      return;
    }

    if (mostrarModulo2) {
      if (pasoModulo2 > 0) {
        setPasoModulo2((paso) => paso - 1);
        setRespuestaCorrecta2(false);
      } else {
        setMostrarModulo2(false);
        setMostrarModulo1(true);
        setPasoModulo1(2);
        setRespuestaCorrecta1(false);
        setVideoActual('bucle1');
      }
      return;
    }

    if (mostrarModulo1) {
      if (pasoModulo1 > 0) {
        setPasoModulo1((paso) => paso - 1);
        setRespuestaCorrecta1(false);
      } else {
        navigate('/');
      }
      return;
    }

    const videosAnteriores = {
      video1: 'video0',
      video2: 'video1',
      video3: 'video2',
      video4: 'video3',
      video5: 'video4',
      video6: 'video5',
      video7: 'video6',
      video7_1: 'video7',
      video8: 'video7_1',
      video8_1: 'video8',
      video9: 'video8_1',
      video10: 'video9',
      bucle1: 'video1',
      bucle2: 'video2',
      bucle3: 'video3',
      bucle4: 'video4',
      bucle5: 'video5',
    };
    const videoAnterior = videosAnteriores[videoActual];

    if (videoAnterior) {
      setVideoActual(videoAnterior);
    } else {
      navigate('/');
    }
  };

  const onEndedPorVideo = {
    video0: manejarFinVideo0,
    video1: manejarFinVideo1,
    video2: manejarFinVideo2,
    video3: manejarFinVideo3,
    video4: manejarFinVideo4,
    video5: manejarFinVideo5,
    video6: manejarFinVideo6,
    video7: manejarFinVideo7,
    video7_1: manejarFinVideo7_1,
    video8: manejarFinVideo8,
    video8_1: manejarFinVideo8_1,
    video9: manejarFinVideo9,
    video10: manejarFinVideo10,
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <button
        aria-label="Volver a la pantalla anterior"
        className="fixed left-4 top-4 z-[100] rounded-full border border-yellow-400/60 bg-black/60 px-4 py-2 font-bold text-white shadow-lg backdrop-blur-md transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        onClick={manejarVolver}
        type="button"
      >
        ← Volver
      </button>
      <video
        key={videoActual}
        ref={(elemento) => {
          if (elemento) elemento.volume = volumen;
        }}
        src={videos[videoActual]}
        className="fixed inset-0 w-full h-full object-cover"
        autoPlay
        muted={isMuted}
        playsInline
        controls={false}
        loop={videoActual.includes('bucle')}
        onEnded={onEndedPorVideo[videoActual]}
      />

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${
          mostrarTransicion ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <p className="text-4xl md:text-5xl font-bold text-center text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
          {textoTransicion}
        </p>
      </div>

      {mostrarModulo1 && (
        <div
          className={`absolute inset-x-3 z-50 mx-auto max-h-[calc(100dvh-2rem)] overflow-y-auto sm:inset-x-6 ${
            pasoModulo1 === 1
              ? 'bottom-4 top-auto max-w-5xl'
              : 'top-1/2 max-w-2xl -translate-y-1/2'
          }`}
        >
          <div
            className={`rounded-xl border border-yellow-400/50 p-4 text-white shadow-[0_0_35px_rgba(250,204,21,0.18)] backdrop-blur-md sm:p-6 ${
              pasoModulo1 === 1 ? 'bg-black/40' : 'bg-black/85'
            }`}
          >
            {pasoModulo1 === 0 && (
              <>
                <h2 className="mb-4 text-2xl font-bold text-yellow-400 sm:text-3xl">
                  Nivel 0 - Conoce el tablero
                </h2>
                <section className="mb-5">
                  <h3 className="mb-2 text-lg font-bold text-white">
                    Situación actual
                  </h3>
                  <p className="mb-3 text-sm text-gray-300 sm:text-base">
                    Según McKinsey (<em>State of AI 2026</em>):
                  </p>
                  <ul className="mb-4 space-y-2 text-left leading-relaxed">
                    <li>
                      🟢 <strong>9 de cada 10</strong> empresas ya usan IA.
                    </li>
                    <li>
                      🟡 Solo <strong>37%</strong> ve impacto en sus
                      resultados financieros.
                    </li>
                    <li>
                      🏆 Apenas <strong>6%</strong> está ganando en serio.
                    </li>
                  </ul>
                  <p className="mb-5 font-semibold text-yellow-100">
                    ¿La diferencia? No es la tecnología. Es saber jugar.
                  </p>
                </section>

                <section className="mb-6">
                  <p className="mb-3">
                    En este nivel vas a desbloquear los 3 pilares:
                  </p>
                  <ul className="space-y-2 text-left leading-relaxed">
                    <li>
                      👥 <strong className="text-yellow-300">Personas:</strong>{' '}
                      los perfiles que hacen que una IA funcione.
                    </li>
                    <li>
                      📊 <strong className="text-yellow-300">Datos:</strong> el
                      combustible sin el que nada arranca.
                    </li>
                    <li>
                      ⚙️ <strong className="text-yellow-300">Tecnología:</strong>{' '}
                      la herramienta correcta para el problema correcto.
                    </li>
                  </ul>
                  <p className="mt-4 font-bold text-yellow-200">
                    Personas × Datos × Tecnología. Si uno vale cero, todo vale
                    cero.
                  </p>
                </section>
                <button
                  onClick={() => setPasoModulo1(1)}
                  className="rounded-lg bg-yellow-400 px-5 py-3 font-bold text-black transition-colors hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-100"
                  type="button"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo1 === 1 && (
              <>
                <h2 className="mb-2 text-xl font-bold text-yellow-400 sm:text-2xl">
                  Pilar 1 - Personas
                </h2>
                <p className="mb-3 text-sm text-gray-200 sm:text-base">
                  Tu equipo detrás de la IA. Gira cada tarjeta para descubrir
                  quién hace posible que funcione.
                </p>
                <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                  {ROLES_PILAR_1.map(
                    ({ icono, grupo, detalle, funcion }, indice) => {
                      const girada = tarjetasGiradas.includes(indice);

                      return (
                        <button
                          key={grupo}
                          aria-label={`${girada ? 'Mostrar frente de' : 'Girar'} tarjeta: ${grupo}`}
                          aria-pressed={girada}
                          className={`flip-card ${girada ? 'is-flipped' : ''}`}
                          onClick={() => alternarTarjeta(indice)}
                          type="button"
                        >
                          <span className="flip-card__inner">
                            <span className="flip-card__face flip-card__front">
                              <span
                                aria-hidden="true"
                                className="text-3xl sm:text-4xl"
                              >
                                {icono}
                              </span>
                              <span className="text-xs font-extrabold leading-snug text-yellow-300 sm:text-sm">
                                {detalle}
                              </span>
                              <span className="text-[10px] font-semibold leading-snug text-gray-200 sm:text-xs">
                                {grupo}
                              </span>
                              <span className="mt-auto border-t border-yellow-200/20 pt-1.5 text-[10px] text-gray-200 sm:text-xs">
                                ⟳ Girar
                              </span>
                            </span>
                            <span className="flip-card__face flip-card__back">
                              <span aria-hidden="true" className="text-4xl">
                                {icono}
                              </span>
                              <span className="text-xs font-extrabold text-yellow-300 sm:text-sm">
                                ¿Qué aportan?
                              </span>
                              <span className="text-xs leading-relaxed text-white sm:text-sm">
                                {funcion}
                              </span>
                              <span className="mt-auto border-t border-yellow-200/20 pt-1.5 text-[10px] text-gray-200 sm:text-xs">
                                ⟳ Volver
                              </span>
                            </span>
                          </span>
                        </button>
                      );
                    },
                  )}
                </div>
                <button
                  onClick={() => setPasoModulo1(2)}
                  className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-100"
                  type="button"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo1 === 2 && (
              <>
                <h2 className="mb-3 text-xl font-black text-yellow-300 sm:text-2xl">
                  🎯 Reto: ¿qué pone en riesgo al proyecto?
                </h2>
                <p className="mb-4 leading-relaxed text-gray-200">
                  Un proyecto de IA no vive solo por tener un buen modelo.
                  También necesita las personas correctas.
                </p>
                <div className="mb-4 rounded-xl border border-white/15 bg-black/25 px-4 py-3 leading-relaxed">
                  Contratas a un solo Data Scientist.
                  <br />
                  Construye un excelente modelo... pero renuncia a los 8 meses.
                </div>
                {!respuestaCorrecta1 ? (
                  <>
                    <h3 className="mb-3 text-xl font-black text-yellow-300">
                      ¿Qué pasa ahora?
                    </h3>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={manejarRespuestaIncorrecta}
                        className={`flex items-center gap-3 rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-left transition-colors hover:bg-white/5 ${
                          errorPregunta ? 'animate-shake' : ''
                        }`}
                        type="button"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 font-bold">
                          A.
                        </span>
                        <span>
                          El modelo sigue funcionando y el proyecto continúa
                          sin problema
                        </span>
                      </button>
                      <button
                        onClick={manejarRespuestaCorrecta}
                        className="flex items-center gap-3 rounded-xl border border-yellow-400/70 bg-yellow-400/10 px-4 py-3 text-left transition-colors hover:bg-yellow-400/20"
                        type="button"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-yellow-300 font-bold text-yellow-300">
                          B.
                        </span>
                        <span>
                          El proyecto queda vulnerable porque faltan otros
                          roles clave
                        </span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    aria-live="polite"
                    className="rounded-xl border border-yellow-400/70 bg-yellow-400/10 p-4"
                  >
                    <h3 className="mb-2 text-xl font-black text-yellow-300">
                      🏆 Bien hecho, ya tienes a tu equipo listo
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-100">
                      Un proyecto de datos no depende de una sola persona.
                      También necesita perfiles que entiendan el negocio, cuiden
                      los datos, preparen la información y acompañen la
                      adopción.
                    </p>
                    <button
                      onClick={manejarContinuarModulo1}
                      className="rounded-lg bg-yellow-400 px-4 py-2 font-bold text-black transition-colors hover:bg-yellow-300"
                      type="button"
                    >
                      Continuar
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {mostrarModulo2 && (
        <div className="absolute left-10 md:left-20 top-1/4 max-w-lg z-50">
          <div className="bg-black/80 backdrop-blur-md border border-yellow-400/50 rounded-xl p-6 text-white">
            {pasoModulo2 === 0 && (
              <>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Pilar 2 — Datos
                </h2>
                <h3 className="mb-2 text-lg font-bold text-white">
                  Tener datos no es suficiente.
                </h3>
                <p className="mb-4 font-bold text-yellow-200">
                  Si los datos fallan, el proyecto también.
                </p>
                <p className="mb-6 leading-relaxed">
                  La IA aprende de los datos que recibe.
                  <br />
                  Si los datos son malos, el resultado también lo será.
                </p>
                <button
                  onClick={() => setPasoModulo2(1)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                  type="button"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo2 === 1 && (
              <>
                <h2 className="mb-4 text-2xl font-bold text-yellow-400">
                  ⚠️ ¿Qué es un dato malo?
                </h2>
                <p className="mb-4 leading-relaxed">
                  Es un dato traicionero.
                </p>
                <p className="mb-2">Por ejemplo:</p>
                <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed marker:text-yellow-300">
                  <li>
                    Falta información:{' '}
                    <em>cliente sin edad o ciudad.</em>
                  </li>
                  <li>
                    Está equivocada:{' '}
                    <em>una venta de $100 registrada como $1.000.</em>
                  </li>
                  <li>
                    Está desactualizada:{' '}
                    <em>un correo que ya no existe.</em>
                  </li>
                  <li>
                    Está repetida:{' '}
                    <em>el mismo cliente aparece tres veces.</em>
                  </li>
                </ul>
                <button
                  onClick={() => setPasoModulo2(2)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                  type="button"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo2 === 2 && (
              <>
                <h2 className="mb-3 text-xl font-black text-yellow-300 sm:text-2xl">
                  🎯 Reto: ¿qué interpreta el modelo?
                </h2>
                <p className="mb-4 leading-relaxed text-gray-200">
                  Un proyecto de IA depende de datos completos y confiables.
                  <br />
                  Si faltan registros, el modelo también puede fallar.
                </p>
                <div className="mb-4 rounded-xl border border-white/15 bg-black/25 px-4 py-3 leading-relaxed">
                  Quieres saber por qué caen las ventas,
                  <br />
                  pero durante dos meses una sucursal dejó de registrar
                  transacciones.
                </div>
                {!respuestaCorrecta2 ? (
                  <>
                    <h3 className="mb-3 text-xl font-black text-yellow-300">
                      ¿Qué interpreta el modelo?
                    </h3>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={manejarRespuestaCorrecta2}
                        className="flex items-center gap-3 rounded-xl border border-yellow-400/70 bg-yellow-400/10 px-4 py-3 text-left transition-colors hover:bg-yellow-400/20"
                        type="button"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-yellow-300 font-bold text-yellow-300">
                          A.
                        </span>
                        <span>
                          Puede creer que no hubo ventas, cuando en realidad
                          faltan datos.
                        </span>
                      </button>
                      <button
                        onClick={manejarRespuestaIncorrecta2}
                        className={`flex items-center gap-3 rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-left transition-colors hover:bg-white/5 ${
                          errorPregunta2 ? 'animate-shake' : ''
                        }`}
                        type="button"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 font-bold">
                          B.
                        </span>
                        <span>La IA completa automáticamente esos dos meses.</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    aria-live="polite"
                    className="rounded-xl border border-yellow-400/70 bg-yellow-400/10 p-4"
                  >
                    <h3 className="mb-2 text-xl font-black text-yellow-300">
                      🏆 Bien hecho, encontraste el problema
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-100">
                      Si faltan registros, el modelo puede confundir ausencia
                      de datos con ausencia de ventas. La IA no inventa lo que
                      la empresa nunca guardó.
                    </p>
                    <button
                      onClick={manejarContinuarModulo2}
                      className="rounded-lg bg-yellow-400 px-4 py-2 font-bold text-black transition-colors hover:bg-yellow-300"
                      type="button"
                    >
                      Continuar
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {mostrarModulo3 && (
        <div className="absolute right-8 md:right-16 top-8 max-w-lg z-50">
          <div className="bg-black/80 backdrop-blur-md border border-yellow-400/50 rounded-xl p-6 text-white">
            {pasoModulo3 === 0 && (
              <>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Pilar 3 — Tecnología
                </h2>
                <h3 className="mb-3 text-lg font-bold text-white">
                  No todo lo que llamamos IA es lo mismo.
                </h3>
                <p className="mb-4 leading-relaxed">
                  Hoy llamamos “IA” a muchas cosas, pero en realidad hay
                  distintas tecnologías para distintos problemas.
                </p>
                <ul className="mb-5 list-disc space-y-2 pl-6 leading-relaxed marker:text-yellow-300">
                  <li>
                    <strong>IA generativa</strong> → crea contenido (texto,
                    audio, voz, imágenes, código) nunca antes visto.
                  </li>
                  <li>
                    <strong>Machine Learning</strong> → predice o detecta
                    patrones a través de los datos.
                  </li>
                  <li>
                    <strong>Automatización</strong> → ejecuta tareas o reglas
                    fijas.
                  </li>
                  <li>
                    <strong>IA</strong> → es el paraguas que engloba distintas
                    formas de hacer “inteligentes” los procesos.
                  </li>
                </ul>
                <p className="mb-6 font-bold text-yellow-200">
                  No necesitas comprar un avión para cruzar la calle.
                </p>
                <button
                  onClick={() => setPasoModulo3(1)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                  type="button"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo3 === 1 && (
              <>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Build / Buy / Integrate
                </h2>
                <p className="mb-6 leading-relaxed">
                  La parte más estratégica: ¿Construyo mi solución (Build),
                  compro un producto (Buy) o integro un modelo externo
                  (Integrate)? Casi siempre existe un producto que resuelve
                  el 70-80% de la necesidad. La pregunta clave no es ¿puedo
                  construirlo? sino ¿debo construirlo? — sobre todo cuando
                  construir cuesta 3 a 6 meses de equipo.
                </p>
                <button
                  onClick={() => setPasoModulo3(2)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                  type="button"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo3 === 2 && (
              <>
                <h2 className="mb-3 text-xl font-black text-yellow-300 sm:text-2xl">
                  🎯 Reto: ¿crear desde cero o integrar?
                </h2>
                <p className="mb-6 leading-relaxed text-gray-200">
                  Tu equipo propone entrenar un modelo de IA desde cero que
                  tomará 6 meses.
                  <br />
                  Sin embargo, un proveedor ya vende un software que hace el
                  80% de lo que necesitas.
                  <br />
                  ¿Qué es lo más estratégico?
                </p>
                {!respuestaCorrecta3 ? (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={manejarRespuestaCorrecta3}
                      className="flex items-center gap-3 rounded-xl border border-yellow-400/70 bg-yellow-400/10 px-4 py-3 text-left transition-colors hover:bg-yellow-400/20"
                      type="button"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-yellow-300 font-bold text-yellow-300">
                        A.
                      </span>
                      <span>
                        Comprar (Buy) o Integrar. La pregunta no es si puedes
                        construirlo, sino si debes hacerlo
                      </span>
                    </button>
                    <button
                      onClick={manejarRespuestaIncorrecta3}
                      className={`flex items-center gap-3 rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-left transition-colors hover:bg-white/5 ${
                        errorPregunta3 ? 'animate-shake' : ''
                      }`}
                      type="button"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 font-bold">
                        B.
                      </span>
                      <span>
                        Construir (Build) desde cero para tener control total,
                        sin importar el tiempo
                      </span>
                    </button>
                  </div>
                ) : (
                  <div
                    aria-live="polite"
                    className="rounded-xl border border-yellow-400/70 bg-yellow-400/10 p-4"
                  >
                    <h3 className="mb-2 text-xl font-black text-yellow-300">
                      🏆 ¡Bien hecho, ese es el enfoque!
                    </h3>
                    <p className="mb-4 leading-relaxed text-gray-100">
                      No siempre hay que construir desde cero. Evaluar opciones
                      como comprar o integrar puede ser más rápido, más
                      eficiente y generar valor antes.
                    </p>
                    <button
                      onClick={manejarContinuarModulo3}
                      className="rounded-lg bg-yellow-400 px-4 py-2 font-bold text-black transition-colors hover:bg-yellow-300"
                      type="button"
                    >
                      Continuar
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {mostrarModulo4 && (
        <div
          className={`absolute z-50 max-h-[calc(100dvh-2rem)] overflow-y-auto ${
            pasoModulo4 === 0
              ? 'inset-x-3 top-1/2 mx-auto w-full max-w-5xl -translate-y-1/2'
              : 'left-3 right-3 top-1/2 mx-auto w-full max-w-lg -translate-y-1/2 sm:left-8 sm:right-auto sm:top-1/4 sm:translate-y-0 md:left-12'
          }`}
        >
          <div className="rounded-xl border border-yellow-400/50 bg-black/70 p-4 text-white shadow-[0_0_35px_rgba(250,204,21,0.16)] backdrop-blur-md sm:p-6">
            {pasoModulo4 === 0 && (
              <>
                <h2 className="mb-5 text-center text-2xl font-black text-yellow-400 sm:text-3xl">
                  ¿Quieres saber de casos reales?
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {CASOS_REALES.map((caso) => (
                    <button
                      aria-pressed={casoSeleccionado === caso.id}
                      className={`relative flex min-h-28 flex-col items-center justify-center rounded-2xl border px-3 py-2 transition hover:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 sm:min-h-36 ${
                        casoSeleccionado === caso.id
                          ? 'border-yellow-300 bg-yellow-400/10 shadow-[0_0_18px_rgba(250,204,21,0.2)]'
                          : 'border-yellow-400/70 bg-black/20'
                      }`}
                      key={caso.id}
                      onClick={() => reproducirCaso(caso.id)}
                      type="button"
                    >
                      <span className={caso.estilo}>{caso.marca}</span>
                      <span className="text-sm font-extrabold text-yellow-300 sm:text-base">
                        {caso.nombre}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-yellow-300 text-yellow-300"
                      >
                        ▶
                      </span>
                    </button>
                  ))}
                </div>

                {casoActivo && (
                  <section
                    aria-live="polite"
                    className="mt-4 rounded-xl border border-white/15 bg-black/30 p-4"
                  >
                    <h3 className="mb-2 font-bold text-yellow-300">
                      {casoActivo.nombre}: el caso
                    </h3>
                    <p className="mb-3 leading-relaxed text-gray-100">
                      {casoActivo.resumen}
                    </p>
                    <audio
                      key={casoActivo.id}
                      controls
                      ref={audioCasoRef}
                      src={`${BASE}audios/casos/${casoActivo.audio}`}
                      onError={() =>
                        setAudioCasoError(
                          `No se encontró el archivo public/audios/casos/${casoActivo.audio}.`,
                        )
                      }
                    >
                      Tu navegador no puede reproducir audio.
                    </audio>
                    {audioCasoError && (
                      <p className="mt-2 text-sm text-amber-200" role="status">
                        {audioCasoError}
                      </p>
                    )}
                  </section>
                )}

                <button
                  onClick={manejarContinuarCasos}
                  className="mt-5 rounded-lg bg-yellow-400 px-4 py-2 font-bold text-black transition-colors hover:bg-yellow-300"
                  type="button"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo4 === 1 && (
              <>
                <p className="mb-6 leading-relaxed">
                  Un tribunal determinó que Air Canada era responsable de la
                  información incorrecta que su chatbot dio a un pasajero
                  sobre una tarifa. El argumento de que el chatbot era una
                  entidad separada no fue aceptado. ¿Qué lección nos deja
                  esto?
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={manejarRespuestaIncorrecta4}
                    className={`flex items-center justify-between border border-yellow-400/50 rounded-lg px-4 py-3 text-left hover:bg-yellow-400/10 transition-colors ${
                      errorPregunta4 ? 'animate-shake' : ''
                    }`}
                  >
                    <span>Faltó una IA más avanzada para evitar errores</span>
                    {errorPregunta4 && (
                      <span className="text-red-500 font-bold ml-2">X</span>
                    )}
                  </button>
                  <button
                    onClick={manejarRespuestaCorrecta4}
                    className="border border-yellow-400/50 rounded-lg px-4 py-3 text-left hover:bg-yellow-400/10 transition-colors"
                  >
                    Lo que dice tu IA, lo dices tú. Antes de poner un modelo
                    frente a clientes hay que definir quién responde. ❌
                    Faltó la GOBERNANZA
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {mostrarModulo5 && (
        <div className="absolute left-8 md:left-12 top-8 max-w-lg z-50">
          <div className="bg-black/80 backdrop-blur-md border border-yellow-400/50 rounded-xl p-6 text-white">
            {pasoModulo5 === 0 && (
              <>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Jaque Mate — Cuando los pilares se alinean
                </h2>
                <p className="mb-6 leading-relaxed">
                  UPS creó ORION para optimizar rutas. No usaron IA
                  generativa espectacular, sino optimización sobre datos
                  operativos muy bien capturados.
                </p>
                <p className="mb-6 flex items-start gap-3 rounded-xl border border-yellow-400/30 bg-yellow-400/5 p-4 leading-relaxed">
                  <span aria-hidden="true" className="text-2xl">
                    💡
                  </span>
                  <span>
                    <strong className="text-yellow-300">Lección:</strong> El
                    proyecto más rentable tuvo datos limpios, un problema claro
                    y gente que efectivamente cambió su forma de trabajar.
                  </span>
                </p>
                <button
                  onClick={() => setPasoModulo5(1)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo5 === 1 && (
              <>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Tener el modelo NO es tener el producto
                </h2>
                <div
                  aria-label="Netflix"
                  className="mb-5 flex items-center justify-center gap-3 rounded-xl border border-red-500/40 bg-black/40 px-4 py-3 shadow-[0_0_24px_rgba(229,9,20,0.2)]"
                >
                  <span
                    aria-hidden="true"
                    className="font-sans text-6xl font-black leading-none text-[#e50914] drop-shadow-[0_0_12px_rgba(229,9,20,0.55)]"
                  >
                    N
                  </span>
                  <span className="font-sans text-2xl font-black tracking-[0.22em] text-white sm:text-3xl">
                    NETFLIX
                  </span>
                </div>
                <p className="mb-6 leading-relaxed">
                  Netflix pagó $1 millón por un algoritmo de recomendación y
                  nunca lo implementó completamente porque el costo de
                  ingeniería no justificaba la mejora. Su éxito es que el
                  modelo está integrado en la interfaz del usuario y hay
                  equipos sosteniéndolo.
                </p>
                <button
                  onClick={() => setPasoModulo5(2)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo5 === 2 && (
              <>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  IA es Orquestación
                </h2>
                <p className="mb-6 leading-relaxed">
                  Los 3 pilares no se suman, se multiplican.
                </p>
                <ul className="mb-5 space-y-2 pl-2 leading-relaxed">
                  <li>• Tecnología sin personas = 0</li>
                  <li>• Personas sin datos = 0</li>
                </ul>
                <h3 className="mb-2 text-xl font-extrabold text-yellow-300">
                  ¿Todo esto es mucho?
                </h3>
                <p className="mb-6 leading-relaxed">
                  Por eso cuando juntas los 3 pilares generas valor. No
                  cualquiera lo hace y no cualquiera puede justificar el ROI de
                  su IA.
                </p>
                <p className="mb-4 leading-relaxed">
                  Sabiendo esto, ¿qué pasa si tienes la tecnología más avanzada
                  y un equipo brillante, pero tus datos son basura?
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={manejarRespuestaIncorrecta5}
                    className={`flex items-center justify-between border border-yellow-400/50 rounded-lg px-4 py-3 text-left hover:bg-yellow-400/10 transition-colors ${
                      errorPregunta5 ? 'animate-shake' : ''
                    }`}
                  >
                    <span>
                      La IA avanzada logra deducir los datos faltantes
                    </span>
                    {errorPregunta5 && (
                      <span className="text-red-500 font-bold ml-2">X</span>
                    )}
                  </button>
                  <button
                    onClick={manejarRespuestaCorrecta5}
                    className="border border-yellow-400/50 rounded-lg px-4 py-3 text-left hover:bg-yellow-400/10 transition-colors"
                  >
                    Todo es cero. Por eso solo el 27% genera valor
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {mostrarModulo6 && (
        <div className="absolute top-1/3 left-8 md:left-12 max-w-lg z-50">
          <div className="bg-black/80 backdrop-blur-md border border-yellow-400/50 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              La Ventaja Competitiva
            </h2>
            <p className="mb-6 leading-relaxed">
              ¿Todo esto es mucho? Por eso es que si lo tienes, tienes una
              ventaja competitiva frente a tu competencia. Porque no
              cualquiera lo hace, y no cualquiera logra justificar el ROI de
              la IA. Con este módulo, estás listo.
            </p>
            <button
              onClick={manejarCruzarPortal}
              className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Cruzar el portal
            </button>
          </div>
        </div>
      )}

      {mostrarCierreFinal && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-1000">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-10 tracking-widest uppercase">
            Módulo 1 DESBLOQUEADO
          </h1>
          <button
            onClick={manejarDemostrarQuePuedo}
            className="bg-yellow-400 text-black px-10 py-5 rounded-full font-bold text-2xl uppercase tracking-wider hover:bg-yellow-300 animate-pulse transition-transform hover:scale-105 shadow-[0_0_20px_rgba(250,204,21,0.6)]"
            type="button"
          >
            DEMOSTRAR QUE PUEDO
          </button>
        </div>
      )}

      {mostrarFinVideo10 && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 px-5 text-center backdrop-blur-sm">
          <h1 className="mb-8 text-3xl font-bold uppercase tracking-wider text-white sm:text-5xl">
            ¡Tu siguiente reto te espera!
          </h1>
          <button
            onClick={manejarEntrarFase1}
            className="rounded-full bg-yellow-400 px-8 py-4 text-xl font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(250,204,21,0.6)] transition-transform hover:scale-105 hover:bg-yellow-300 sm:px-10 sm:py-5 sm:text-2xl"
            type="button"
          >
            ENTRAR A LA FASE 1
          </button>
        </div>
      )}
    </div>
  );
}

export default Nivel0;
