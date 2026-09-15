import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSonido } from './context/SonidoContext.jsx';

const videos = {
  video0: '/nivel0/video0.mp4',
  video1: '/nivel0/video1.mp4',
  bucle1: '/nivel0/bucle1.mp4',
  video2: '/nivel0/video2.mp4',
  bucle2: '/nivel0/bucle2.mp4',
  video3: '/nivel0/video3.mp4',
  bucle3: '/nivel0/bucle3.mp4',
  video4: '/nivel0/video4.mp4',
  bucle4: '/nivel0/bucle4.mp4',
  video5: '/nivel0/video5.mp4',
  bucle5: '/nivel0/bucle5.mp4',
  video6: '/nivel0/video6.mp4',
  video7: '/nivel0/video7.mp4',
  video7_1: '/nivel0/video7_1.mp4',
  video8: '/nivel0/video8.mp4',
};

const ROLES_PILAR_1 = [
  {
    grupo: 'Los que hacen que sirva',
    detalle: 'Experto del negocio, Data Analyst.',
  },
  {
    grupo: 'Los que evitan que explote',
    detalle: 'Data Owner, Data Steward, Gestión del Cambio.',
  },
  {
    grupo: 'Los que hacen que la data sirva',
    detalle: 'Data Engineer, Especialista de Gobierno.',
  },
  {
    grupo: 'Los que hacen los modelos',
    detalle: 'Data Scientist, ML Engineer, AI Engineer, Cloud/DevOps.',
  },
];

function Nivel0() {
  const navigate = useNavigate();
  const { isMuted, volumen } = useSonido();
  const [videoActual, setVideoActual] = useState('video0');
  const [mostrarTransicion, setMostrarTransicion] = useState(false);
  const [textoTransicion, setTextoTransicion] = useState('');

  const [mostrarModulo1, setMostrarModulo1] = useState(false);
  const [pasoModulo1, setPasoModulo1] = useState(0);
  const [errorPregunta, setErrorPregunta] = useState(false);

  const [mostrarModulo2, setMostrarModulo2] = useState(false);
  const [pasoModulo2, setPasoModulo2] = useState(0);
  const [errorPregunta2, setErrorPregunta2] = useState(false);

  const [mostrarModulo3, setMostrarModulo3] = useState(false);
  const [pasoModulo3, setPasoModulo3] = useState(0);
  const [errorPregunta3, setErrorPregunta3] = useState(false);

  const [mostrarModulo4, setMostrarModulo4] = useState(false);
  const [pasoModulo4, setPasoModulo4] = useState(0);
  const [errorPregunta4, setErrorPregunta4] = useState(false);

  const [mostrarModulo5, setMostrarModulo5] = useState(false);
  const [pasoModulo5, setPasoModulo5] = useState(0);
  const [errorPregunta5, setErrorPregunta5] = useState(false);

  const [mostrarModulo6, setMostrarModulo6] = useState(false);
  const [mostrarCierreFinal, setMostrarCierreFinal] = useState(false);

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

  const manejarRespuestaCorrecta = () => {
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
    setMostrarCierreFinal(true);
    localStorage.setItem('progresoExperiencia', '1');
  };

  const manejarEntrarFase1 = () => {
    navigate('/niveles');
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
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
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
        <div className="absolute right-10 top-1/4 max-w-lg z-50">
          <div className="bg-black/80 backdrop-blur-md border border-yellow-400/50 rounded-xl p-6 text-white">
            {pasoModulo1 === 0 && (
              <>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Nivel 0 — Conoce el Tablero
                </h2>
                <p className="mb-6 leading-relaxed">
                  McKinsey analizó más de 400 proyectos de IA corporativos:
                  solo el 27% llegó a producción y generó valor medible. El
                  resto murió en fase piloto o fue desconectado a los 6-12
                  meses por falta de adopción real. Construir un modelo toma
                  en promedio entre 3 y 6 meses. Si fallan, es porque les
                  faltó uno de estos tres pilares: Personas, Datos o
                  Tecnología. Hoy no vas a construir un modelo. Hoy vas a
                  conocer el tablero completo.
                </p>
                <button
                  onClick={() => setPasoModulo1(1)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo1 === 1 && (
              <>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Pilar 1 — Personas
                </h2>
                <p className="mb-3">
                  Un proyecto de IA necesita varios roles distintos:
                </p>
                <ul className="mb-6 space-y-2 list-disc list-inside">
                  {ROLES_PILAR_1.map(({ grupo, detalle }) => (
                    <li key={grupo}>
                      <span className="text-yellow-400 font-bold">
                        {grupo}:
                      </span>{' '}
                      {detalle}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setPasoModulo1(2)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo1 === 2 && (
              <>
                <p className="mb-6 leading-relaxed">
                  El proyecto no muere por falta de talento técnico. Muere
                  por falta de roles. Si contratas un solo Data Scientist,
                  hace un modelo excelente y renuncia a los ocho meses...
                  ¿Qué ocurre?
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={manejarRespuestaIncorrecta}
                    className={`flex items-center justify-between border border-yellow-400/50 rounded-lg px-4 py-3 text-left hover:bg-yellow-400/10 transition-colors ${
                      errorPregunta ? 'animate-shake' : ''
                    }`}
                  >
                    <span>
                      El modelo se mantiene y la IA funciona de forma
                      autónoma
                    </span>
                    {errorPregunta && (
                      <span className="text-red-500 font-bold ml-2">X</span>
                    )}
                  </button>
                  <button
                    onClick={manejarRespuestaCorrecta}
                    className="border border-yellow-400/50 rounded-lg px-4 py-3 text-left hover:bg-yellow-400/10 transition-colors"
                  >
                    Nadie más sabe abrir el archivo. Se necesita quien
                    entienda el dato, el negocio, la infraestructura y
                    adopción
                  </button>
                </div>
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
                <p className="mb-6 leading-relaxed">
                  Líder, la segunda trampa mental: creer que ¿tenemos datos?
                  es una pregunta de sí o no. No lo es. Los datos son una
                  cadena, y la empresa puede romperse en cualquier eslabón:
                  Fuente → Integración → Calidad → Almacenamiento → Acceso →
                  Gobierno.
                </p>
                <button
                  onClick={() => setPasoModulo2(1)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo2 === 1 && (
              <>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Calidad y Esfuerzo
                </h2>
                <p className="mb-6 leading-relaxed">
                  La regla que todo gerente debe interiorizar: basura entra,
                  basura sale — un modelo entrenado con datos sucios produce
                  decisiones sucias, pero con apariencia de rigor científico.
                  Entre el 60% y el 80% del esfuerzo de un proyecto de IA se
                  va en datos, no en el modelo.
                </p>
                <button
                  onClick={() => setPasoModulo2(2)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo2 === 2 && (
              <>
                <p className="mb-6 leading-relaxed">
                  Quieres predecir el abandono de clientes, pero descubres
                  que sus visitas se anotaban en cuadernos y los reclamos
                  llegaban por WhatsApp sin quedar registrados. ¿Qué sucede
                  con el modelo?
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={manejarRespuestaIncorrecta2}
                    className={`flex items-center justify-between border border-yellow-400/50 rounded-lg px-4 py-3 text-left hover:bg-yellow-400/10 transition-colors ${
                      errorPregunta2 ? 'animate-shake' : ''
                    }`}
                  >
                    <span>
                      El modelo deduce los reclamos faltantes gracias al
                      Machine Learning
                    </span>
                    {errorPregunta2 && (
                      <span className="text-red-500 font-bold ml-2">X</span>
                    )}
                  </button>
                  <button
                    onClick={manejarRespuestaCorrecta2}
                    className="border border-yellow-400/50 rounded-lg px-4 py-3 text-left hover:bg-yellow-400/10 transition-colors"
                  >
                    Falla. No puedes pedirle a la IA que encuentre la
                    respuesta en datos que tu empresa nunca registró
                  </button>
                </div>
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
                <p className="mb-6 leading-relaxed">
                  Líder, esta es la que nos confunde a todos. Aquí hay tres
                  cosas distintas: qué tipo de IA existe, cómo se decide qué
                  usar, y cómo eso llega al usuario. No todo se resuelve con
                  un chatbot. Predecir qué cliente se va es Machine Learning
                  clásico, no IA generativa. Muchos están usando el martillo
                  de moda para un tornillo.
                </p>
                <button
                  onClick={() => setPasoModulo3(1)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
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
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo3 === 2 && (
              <>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  El modelo no es el producto
                </h2>
                <p className="mb-6 leading-relaxed">
                  El error más caro y común: tener un modelo entrenado NO es
                  tener una solución. Falta toda la cadena: Modelo → API →
                  Backend → Frontend → Usuario → Monitoreo. Además, un
                  modelo se degrada: el que predecía bien en enero puede
                  estar equivocándose en julio, y nadie se entera hasta que
                  el daño ya está hecho.
                </p>
                <button
                  onClick={() => setPasoModulo3(3)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo3 === 3 && (
              <>
                <p className="mb-6 leading-relaxed">
                  Tu equipo propone entrenar un modelo de IA desde cero que
                  tomará 6 meses. Sin embargo, un proveedor ya vende un
                  software que hace el 80% de lo que necesitas. ¿Qué es lo
                  más estratégico?
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={manejarRespuestaIncorrecta3}
                    className={`flex items-center justify-between border border-yellow-400/50 rounded-lg px-4 py-3 text-left hover:bg-yellow-400/10 transition-colors ${
                      errorPregunta3 ? 'animate-shake' : ''
                    }`}
                  >
                    <span>
                      Construir (Build) desde cero para tener control total,
                      sin importar el tiempo
                    </span>
                    {errorPregunta3 && (
                      <span className="text-red-500 font-bold ml-2">X</span>
                    )}
                  </button>
                  <button
                    onClick={manejarRespuestaCorrecta3}
                    className="border border-yellow-400/50 rounded-lg px-4 py-3 text-left hover:bg-yellow-400/10 transition-colors"
                  >
                    Comprar (Buy) o Integrar. La pregunta no es si puedes
                    construirlo, sino si debes hacerlo
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {mostrarModulo4 && (
        <div className="absolute left-8 md:left-12 top-1/4 max-w-lg z-50">
          <div className="bg-black/80 backdrop-blur-md border border-yellow-400/50 rounded-xl p-6 text-white">
            {pasoModulo4 === 0 && (
              <>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Casos Reales — Faltaron los Datos
                </h2>
                <p className="mb-6 leading-relaxed">
                  Amazon desarrolló un sistema para filtrar hojas de vida. El
                  modelo aprendió de contrataciones históricas sesgadas y
                  penalizó currículums de mujeres. Zillow usaba un modelo
                  para comprar casas; cuando el mercado se movió, el modelo
                  siguió comprando con estimaciones desactualizadas.
                  Lección: Un modelo no corrige el sesgo, lo escala. Y en
                  producción sin monitoreo, es una bomba de tiempo. ❌
                  Faltaron los DATOS.
                </p>
                <button
                  onClick={() => setPasoModulo4(1)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo4 === 1 && (
              <>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Casos Reales — Faltaron las Personas
                </h2>
                <p className="mb-6 leading-relaxed">
                  IBM Watson Oncology fracasó por falta de encaje con el
                  flujo de trabajo real de los médicos. McDonald's terminó
                  la prueba de su IA en autoservicio porque los errores se
                  volvieron virales. Lección: la tecnología era de punta,
                  pero un 90% de acierto es inaceptable frente a un cliente.
                  ❌ Faltaron las PERSONAS (y la adopción).
                </p>
                <button
                  onClick={() => setPasoModulo4(2)}
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Siguiente
                </button>
              </>
            )}

            {pasoModulo4 === 2 && (
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
                  operativos muy bien capturados. Lección: El proyecto más
                  rentable tuvo datos limpios, un problema claro y gente que
                  efectivamente cambió su forma de trabajar.
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
                  Los tres pilares no se suman. Se multiplican. Tecnología
                  sin personas = Cero. Personas sin datos = Cero. Sabiendo
                  esto, ¿qué pasa si tienes la tecnología más avanzada y un
                  equipo brillante, pero tus datos son basura?
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
            Nivel 0 Completado
          </h1>
          <button
            onClick={manejarEntrarFase1}
            className="bg-yellow-400 text-black px-10 py-5 rounded-full font-bold text-2xl uppercase tracking-wider hover:bg-yellow-300 animate-pulse transition-transform hover:scale-105 shadow-[0_0_20px_rgba(250,204,21,0.6)]"
          >
            ENTRAR A LA FASE 1
          </button>
        </div>
      )}
    </div>
  );
}

export default Nivel0;
