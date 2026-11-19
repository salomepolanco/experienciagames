import { useRef, useState } from 'react';
import { useSonido } from './context/SonidoContext.jsx';

const COFRES = [
  { valor: 'carrito', etiqueta: '🛒 Carrito Fantasma' },
  { valor: 'gamers', etiqueta: '💤 Gamers Dormidos' },
  { valor: 'promocion', etiqueta: '📣 Promoción Mal Dirigida' },
];

const FUENTES = [
  { valor: 'cliente', etiqueta: '🧑 Cliente' },
  { valor: 'empleado', etiqueta: '👷 Empleado' },
  { valor: 'proceso', etiqueta: '🖥️ Proceso' },
];

const BASE = import.meta.env.BASE_URL;

const AUDIO_CONTEXTO_GENERAL = `${BASE}audios/ContextoGeneral.mp3`;
const AUDIO_PREAMBULO_PLAYSTATION = `${BASE}audios/preambulo_playstation.mp3`;

const AUDIOS_COFRE = {
  carrito: `${BASE}audios/Cofre1Carrito.mp3`,
  gamers: `${BASE}audios/Cofre2Gamers.mp3`,
  promocion: `${BASE}audios/Cofre3Promocion.mp3`,
};

const VIDEO_FUENTE_PENDIENTE = `${BASE}videos/pendientesVideos.mp4`;

const VIDEOS_FUENTE = {
  carrito: {
    cliente: `${BASE}videos/CarritoFuente1.mp4`,
    empleado: `${BASE}videos/CarritoFuente2.mp4`,
    proceso: `${BASE}videos/CarritoFuente3.mp4`,
  },
  gamers: {
    cliente: `${BASE}videos/GamersFuente1.mp4`,
    empleado: `${BASE}videos/GamersFuente2.mp4`,
    proceso: `${BASE}videos/GamersFuente3.mp4`,
  },
  promocion: {
    empleado: `${BASE}videos/PromocionFuente2.mp4`,
    proceso: `${BASE}videos/PromocionFuente3.mp4`,
  },
};

const obtenerVideoFuente = (cofre, fuente) =>
  VIDEOS_FUENTE[cofre]?.[fuente] ?? VIDEO_FUENTE_PENDIENTE;

const VIDEO_FUENTE_VERTICAL = {
  carrito: ['cliente'],
  gamers: ['cliente', 'proceso'],
};

const TABLAS_CARRITO = [
  {
    nombre: 'eventos_checkout',
    campos: [
      {
        id: 'c_us1',
        nombre: 'usuario_id',
        detalle: '(Texto, 5% nulos, ej: U1345)',
        esTrampa: false,
      },
      {
        id: 'c_us2',
        nombre: 'usuario_id2 (CI/DNI)',
        detalle: '(Numérica, 65% nulos, ej: 1740572549)',
        esTrampa: true,
      },
      {
        id: 'c_nom',
        nombre: 'nombre_usuario',
        detalle: '(Texto, 10% nulos, ej: DarkGamer92)',
        esTrampa: false,
      },
      {
        id: 'c_pro',
        nombre: 'producto_id',
        detalle: '(Texto, 0% nulos, ej: G567)',
        esTrampa: false,
      },
      {
        id: 'c_pas',
        nombre: 'paso_checkout',
        detalle: '(Entero, 0% nulos, ej: 2)',
        esTrampa: false,
      },
      {
        id: 'c_fec',
        nombre: 'fecha_hora',
        detalle: '(Fecha, 0% nulos, ej: 2025-09-01 15:32)',
        esTrampa: false,
      },
    ],
  },
  {
    nombre: 'eventos_carrito',
    esTablaDuplicada: true,
    descripcion:
      'Mismas columnas y mismos valores que eventos_checkout. ¿Dataset duplicado?',
    campos: [
      {
        id: 'ca_us1',
        nombre: 'usuario_id',
        detalle: '(Texto, 5% nulos, ej: U1345)',
        esTrampa: false,
      },
      {
        id: 'ca_us2',
        nombre: 'usuario_id2 (CI/DNI)',
        detalle: '(Numérica, 65% nulos, ej: 1740572549)',
        esTrampa: false,
      },
      {
        id: 'ca_nom',
        nombre: 'nombre_usuario',
        detalle: '(Texto, 10% nulos, ej: DarkGamer92)',
        esTrampa: false,
      },
      {
        id: 'ca_pro',
        nombre: 'producto_id',
        detalle: '(Texto, 0% nulos, ej: G567)',
        esTrampa: false,
      },
      {
        id: 'ca_pas',
        nombre: 'paso_checkout',
        detalle: '(Entero, 0% nulos, ej: 2)',
        esTrampa: false,
      },
      {
        id: 'ca_fec',
        nombre: 'fecha_hora',
        detalle: '(Fecha, 0% nulos, ej: 2025-09-01 15:32)',
        esTrampa: false,
      },
    ],
  },
  {
    nombre: 'errores_pago',
    campos: [
      {
        id: 'e_us1',
        nombre: 'usuario_id',
        detalle: '(Texto, 5% nulos, ej: U1345)',
        esTrampa: false,
      },
      {
        id: 'e_us2',
        nombre: 'usuario_id2 (CI/DNI)',
        detalle: '(Numérica, 65% nulos, ej: 1740572549)',
        esTrampa: true,
      },
      {
        id: 'e_nom',
        nombre: 'nombre_usuario',
        detalle: '(Texto, 10% nulos, ej: DarkGamer92)',
        esTrampa: false,
      },
      {
        id: 'e_pro',
        nombre: 'producto_id',
        detalle: '(Texto, 0% nulos, ej: G567)',
        esTrampa: false,
      },
      {
        id: 'e_pas',
        nombre: 'paso_checkout',
        detalle: '(Entero, 0% nulos, ej: 2)',
        esTrampa: false,
      },
      {
        id: 'e_fec',
        nombre: 'fecha_hora',
        detalle: '(Fecha, 0% nulos, ej: 2025-09-01 15:32)',
        esTrampa: false,
      },
      {
        id: 'e_pre',
        nombre: 'precio_descuento',
        detalle: '(Decimal, 10% nulos, ej: 49.99)',
        esTrampa: false,
      },
      {
        id: 'e_mon',
        nombre: 'moneda',
        detalle: '(Texto, 0% nulos, ej: USD)',
        esTrampa: false,
      },
    ],
  },
];

const TABLAS_GAMERS = [
  {
    nombre: 'suscripciones_plus',
    campos: [
      {
        id: 's_us',
        nombre: 'usuario_id',
        detalle: '(Texto, 0% nulos, ej: U765)',
        esTrampa: false,
      },
      {
        id: 's_pa',
        nombre: 'pais_usuario',
        detalle: '(Texto, 0% nulos, ej: Colombia)',
        esTrampa: false,
      },
      {
        id: 's_pl',
        nombre: 'plan',
        detalle: '(Texto, 0% nulos, ej: Premium)',
        esTrampa: false,
      },
      {
        id: 's_fi',
        nombre: 'fecha_inicio',
        detalle: '(Fecha, 0% nulos, ej: 2025-01-01)',
        esTrampa: false,
      },
      {
        id: 's_ff',
        nombre: 'fecha_fin',
        detalle: '(Fecha, 0% nulos, ej: 2025-12-31)',
        esTrampa: false,
      },
    ],
  },
  {
    nombre: 'actividad_mensual',
    campos: [
      {
        id: 'a_us',
        nombre: 'usuario_id',
        detalle: '(Texto, 0% nulos, ej: U765)',
        esTrampa: false,
      },
      {
        id: 'a_ju',
        nombre: 'juego_id',
        detalle: '(Texto, 2% nulos, ej: X111)',
        esTrampa: true,
      },
      {
        id: 'a_mi',
        nombre: 'minutos_mes',
        detalle: '(Entero, 0% nulos, ej: 120)',
        esTrampa: false,
      },
      {
        id: 'a_me',
        nombre: 'mes',
        detalle: '(Texto, 0% nulos, ej: 2025-08)',
        esTrampa: false,
      },
    ],
  },
  {
    nombre: 'email_lifecycle',
    descripcion:
      'La llave de este dataset es correo_usuario, no usuario_id — revisa si realmente cruza con los demás.',
    campos: [
      {
        id: 'em_co',
        nombre: 'correo_usuario',
        detalle: '(Texto, 0% nulos, ej: gamer1@ps.com)',
        esTrampa: true,
      },
      {
        id: 'em_ca',
        nombre: 'campana_id',
        detalle: '(Texto, 0% nulos, ej: C123)',
        esTrampa: false,
      },
      {
        id: 'em_ab',
        nombre: 'abierto',
        detalle: '(Entero (1/0), 0% nulos, ej: 1)',
        esTrampa: false,
      },
      {
        id: 'em_cl',
        nombre: 'clic',
        detalle: '(Entero (1/0), 0% nulos, ej: 0)',
        esTrampa: false,
      },
    ],
  },
];

const TABLAS_PROMOCION = [
  {
    nombre: 'impresiones_ads',
    campos: [
      {
        id: 'i_ca',
        nombre: 'campana_id',
        detalle: '(Texto, 0% nulos, ej: C123)',
        esTrampa: false,
      },
      {
        id: 'i_cn',
        nombre: 'canal',
        detalle: '(Texto, 0% nulos, ej: IG)',
        esTrampa: false,
      },
      {
        id: 'i_im',
        nombre: 'impresiones',
        detalle: '(Entero, 0% nulos, ej: 12000)',
        esTrampa: false,
      },
      {
        id: 'i_cl',
        nombre: 'clics',
        detalle: '(Entero, 0% nulos, ej: 450)',
        esTrampa: false,
      },
      {
        id: 'i_fe',
        nombre: 'fecha',
        detalle: '(Fecha, 0% nulos, ej: 2025-08-10)',
        esTrampa: false,
      },
    ],
  },
  {
    nombre: 'sesión_tienda',
    descripcion:
      '76% de nulos en usuario_id y 66% en sesión_id, además de tiempos negativos imposibles. ¿Se puede confiar en este dataset?',
    campos: [
      {
        id: 'st_us',
        nombre: 'usuario_id',
        detalle: '(Texto, 76% nulos, ej: U999)',
        esTrampa: false,
      },
      {
        id: 'st_se',
        nombre: 'sesión_id',
        detalle: '(Texto, 66% nulos, ej: S-551)',
        esTrampa: false,
      },
      {
        id: 'st_ti',
        nombre: 'tiempo_sesion',
        detalle: '(Entero, 0% nulos, ej: -120, 100, -5)',
        esTrampa: true,
      },
      {
        id: 'st_pa',
        nombre: 'pagina',
        detalle: '(Texto, 0% nulos, ej: Checkout)',
        esTrampa: false,
      },
      {
        id: 'st_fe',
        nombre: 'fecha_hora',
        detalle: '(Fecha, 0% nulos, ej: 2025-08-10 12:20)',
        esTrampa: false,
      },
    ],
  },
  {
    nombre: 'compras_online',
    campos: [
      {
        id: 'co_us',
        nombre: 'usuario_id',
        detalle: '(Texto, 0% nulos, ej: U999)',
        esTrampa: false,
      },
      {
        id: 'co_se',
        nombre: 'sesion_id',
        detalle: '(Texto, 0% nulos, ej: S-551)',
        esTrampa: false,
      },
      {
        id: 'co_pr',
        nombre: 'producto_id',
        detalle: '(Texto, 0% nulos, ej: G888)',
        esTrampa: false,
      },
      {
        id: 'co_mo',
        nombre: 'monto',
        detalle: '(Texto, 0% nulos, ej: 59.99 USD)',
        esTrampa: true,
      },
      {
        id: 'co_fe',
        nombre: 'fecha',
        detalle: '(Fecha, 0% nulos, ej: 2025-08-10)',
        esTrampa: false,
      },
    ],
  },
];

const TABLAS_POR_COFRE = {
  carrito: TABLAS_CARRITO,
  gamers: TABLAS_GAMERS,
  promocion: TABLAS_PROMOCION,
};

const datosCofres = {
  carrito: {
    historia:
      <>
        El <strong>65% de los clientes abandona su carrito</strong> antes de
        completar la compra en la app.
        <br />
        <br />
        ¿El problema es el precio final, los errores de pago o algo más?
        <br />
        <br />
        <strong>La gerencia exige respuestas y resultados.</strong> Tu reto es
        descubrir por qué los clientes no compran y cómo recuperar esas ventas
        antes de que tu puesto esté en riesgo.
      </>,
    cliente: {
      linea: 'Estaba a punto de comprar el nuevo control, pero cuando vi el total con el envío, mejor cerré la página.',
      correcta: '¿En qué momento exacto del proceso decidiste no continuar?',
      incorrecta: '¿Te gustó la tienda?',
      pistaCorrecta:
        'Los clientes abandonan justo en el paso donde se muestra el costo final con envío incluido.',
      pistaIncorrecta:
        'Algo no le convenció antes de pagar, pero no queda claro qué.',
    },
    empleado: {
      linea: 'Todos los días recibo el mismo reclamo, pero arriba no me creen que sea tan seguido.',
      correcta: '¿Cuál es el reclamo que más se repite?',
      incorrecta: '¿Cómo va tu día?',
      pistaCorrecta:
        'El precio que ven al inicio no es el que terminan pagando: el salto por envío e impuestos genera la mayoría de quejas.',
      pistaIncorrecta:
        'Hay quejas sobre el precio, pero sin detalle de cuál ni cuánto.',
    },
    proceso: {
      linea: 'Registro cada intento de pago… no todos terminan bien, pero nadie me pregunta cuántos.',
      correcta: '¿Qué porcentaje de los intentos de pago termina en error?',
      incorrecta: '¿Está todo funcionando bien?',
      pistaCorrecta:
        '18% de los pagos fallan por rechazo de tarjeta o tiempo de espera agotado.',
      pistaIncorrecta:
        "El sistema reporta que 'todo funciona', sin dar ninguna cifra real.",
    },
  },
  gamers: {
    historia:
      <>
        Cada vez más jugadores están dejando de usar{' '}
        <strong>PlayStation Plus</strong>. Miles llevan más de 60 días sin jugar
        y las cancelaciones de suscripciones han aumentado un{' '}
        <strong>12%</strong>.
        <br />
        <br />
        ¿Por qué los jugadores están perdiendo el interés? ¿Qué podemos hacer
        para evitar que cancelen?
        <br />
        <br />
        <strong>La gerencia exige resultados.</strong> Tu misión es descubrir
        por qué los jugadores se están alejando y encontrar cómo hacer que
        vuelvan a jugar antes de que tu equipo sea recortado.
      </>,
    cliente: {
      linea: 'Pago la suscripción cada mes, pero la verdad ya ni recuerdo cuándo abrí la app por última vez.',
      correcta: '¿Hace cuánto tiempo no juegas ni abres la app?',
      incorrecta: '¿Te gusta PlayStation Plus?',
      pistaCorrecta:
        'Hay jugadores que llevan más de 60 días sin abrir la app, aunque siguen pagando la suscripción.',
      pistaIncorrecta:
        'Dice que sí le gusta, pero no dice si realmente lo usa.',
    },
    empleado: {
      linea: 'Mando correos de reactivación cada semana, pero no sé si alguien realmente los ve.',
      correcta: '¿Qué beneficios usan más los jugadores que sí están activos?',
      incorrecta: '¿Cómo va la campaña?',
      pistaCorrecta:
        'Los activos usan sobre todo el catálogo de juegos mensuales y el multijugador online; casi nadie prueba las betas.',
      pistaIncorrecta: 'Dice que “más o menos”, sin dar ninguna cifra.',
    },
    proceso: {
      linea: 'Envío las campañas de reactivación automáticamente, pero nadie revisa lo que pasa después.',
      correcta: '¿Cuántos abren o hacen clic en las campañas de reactivación?',
      incorrecta: '¿Las campañas están funcionando?',
      pistaCorrecta:
        'Solo el 4% abre el correo y menos del 1% hace clic en la campaña de reactivación.',
      pistaIncorrecta:
        'El sistema dice que “se enviaron correctamente”, sin dar tasa de apertura.',
    },
  },
  promocion: {
    historia:
      <>
        PlayStation LATAM está gastando miles de dólares en publicidad.{' '}
        <strong>
          Los anuncios reciben muchos clics, pero generan pocas ventas.
        </strong>
        <br />
        <br />
        ¿Estamos mostrando publicidad a las personas equivocadas? ¿Cómo saber
        qué clientes realmente compran?
        <br />
        <br />
        <strong>
          La gerencia está cuestionando la inversión en marketing.
        </strong>{' '}
        Tu misión es descubrir a qué clientes dirigir las campañas para
        conseguir más ventas sin desperdiciar presupuesto.
        <br />
        <br />
        <strong>
          Si lo logras, podrías convertirte en el próximo Director Regional.
        </strong>
      </>,
    cliente: {
      linea: 'Vi el anuncio, hice clic porque se veía bien, pero al final no compré nada.',
      correcta: '¿Qué te hizo no completar la compra después de hacer clic?',
      incorrecta: '¿Te gustó el anuncio?',
      pistaCorrecta:
        'Muchos hacen clic por el anuncio llamativo, pero abandonan porque el precio o la oferta no coincide con lo prometido.',
      pistaIncorrecta:
        'Dice que el anuncio le gustó, pero no explica por qué no compró.',
    },
    empleado: {
      linea: 'Tengo reportes de todas las campañas, pero mezclamos datos de distintos países y monedas.',
      correcta: '¿Qué perfil de cliente sí termina comprando?',
      incorrecta: '¿Cómo van las campañas?',
      pistaCorrecta:
        'Los que convierten son mayoritariamente usuarios de PlayStation Plus con historial de compras previas en la tienda.',
      pistaIncorrecta:
        'Dice que “algunas van bien”, sin identificar quién compra realmente.',
    },
    proceso: {
      linea: 'Registro cada venta, pero en distintas monedas según el país, y eso complica todo.',
      correcta:
        '¿Cómo se ve el ROI si normalizamos todos los montos a una sola moneda?',
      incorrecta: '¿Cuánto se vendió?',
      pistaCorrecta:
        'Al normalizar a USD, el ROI real es menor al reportado: varias campañas en países con monedas débiles inflan las cifras en moneda local.',
      pistaIncorrecta:
        'Da un número total sin normalizar, que no refleja el ROI real.',
    },
  },
};

function Mision1() {
  const { isMuted, volumen } = useSonido();
  const audioContextoRef = useRef(null);
  const audioPreambuloRef = useRef(null);
  const audioCofreRef = useRef(null);
  const [videoActual, setVideoActual] = useState('modulo1video1');

  const [pasoMision, setPasoMision] = useState(0);
  const [errorAudioPreambulo, setErrorAudioPreambulo] = useState('');
  const [cofreActivo, setCofreActivo] = useState(null);

  const [mostrarContinuara, setMostrarContinuara] = useState(false);

  const [fuenteActiva, setFuenteActiva] = useState(null);
  const [fuentesVisitadas, setFuentesVisitadas] = useState([]);
  const [feedbackFuente, setFeedbackFuente] = useState(null);
  const [errorPregunta, setErrorPregunta] = useState(false);

  const [trampasEncontradas, setTrampasEncontradas] = useState([]);
  const [mensajeAuditoria, setMensajeAuditoria] = useState(null);

  const manejarElegirCofre = (valor) => {
    setCofreActivo(valor);
  };

  const manejarInvestigarCaso = () => {
    setVideoActual('modulo1video4');
  };

  const manejarSeleccionarFuente = (valor) => {
    setErrorPregunta(false);
    setFuenteActiva(valor);
  };

  const manejarResponderPregunta = (esCorrecta) => {
    const data = datosCofres[cofreActivo]?.[fuenteActiva];
    if (!data) return;

    if (!esCorrecta) {
      setErrorPregunta(true);
      return;
    }

    setErrorPregunta(false);
    setFeedbackFuente(data.pistaCorrecta);
    setFuentesVisitadas((previas) =>
      previas.includes(fuenteActiva) ? previas : [...previas, fuenteActiva],
    );
  };

  const manejarCerrarConexion = () => {
    setFeedbackFuente(null);
    setFuenteActiva(null);
    setErrorPregunta(false);
  };

  const reproducirAudioPreambulo = () => {
    setErrorAudioPreambulo('');
    audioPreambuloRef.current?.play().catch((error) => {
      console.error('No se pudo reproducir el audio del preámbulo:', error);
      setErrorAudioPreambulo(
        'El audio todavía no está disponible. Puedes continuar leyendo.',
      );
    });
  };

  const mostrarFeedbackTemporal = (mensaje) => {
    setMensajeAuditoria(mensaje);
    setTimeout(() => {
      setMensajeAuditoria(null);
    }, 4000);
  };

  const manejarMarcarCampo = (campo) => {
    if (campo.esTrampa) {
      setTrampasEncontradas((previas) =>
        previas.includes(campo.id) ? previas : [...previas, campo.id],
      );
      return;
    }

    mostrarFeedbackTemporal('Ese campo está limpio, no es la trampa. Sigue revisando.');
  };

  const manejarFinVideo8_1 = () => {
    setMostrarContinuara(true);

    const progresoActual = localStorage.getItem('progresoExperiencia');
    if (!progresoActual || Number(progresoActual) < 2) {
      localStorage.setItem('progresoExperiencia', '2');
    }
  };

  const PASO_ANTERIOR = {
    modulo1bucle2: 'modulo1bucle1',
    modulo1bucle5: 'modulo1bucle4',
    modulo1bucle6: 'modulo1bucle5',
    modulo1bucle7: 'modulo1bucle6',
  };

  const manejarVolver = () => {
    if (videoActual === 'modulo1bucle3') {
      if (cofreActivo) {
        setCofreActivo(null);
        return;
      }
      if (pasoMision > 0) {
        setPasoMision((pasoActual) => pasoActual - 1);
        return;
      }
      setVideoActual('modulo1bucle2');
      return;
    }

    if (videoActual === 'modulo1bucle4') {
      if (feedbackFuente) {
        setFeedbackFuente(null);
        return;
      }
      if (fuenteActiva) {
        setErrorPregunta(false);
        setFuenteActiva(null);
        return;
      }
      setVideoActual('modulo1bucle3');
      return;
    }

    const anterior = PASO_ANTERIOR[videoActual];
    if (anterior) {
      setVideoActual(anterior);
    }
  };

  const manejarReiniciarNivel = () => {
    const confirmado = window.confirm(
      '¿Reiniciar el nivel? Perderás todo tu progreso actual en este módulo.',
    );
    if (!confirmado) return;

    setVideoActual('modulo1video1');
    setPasoMision(0);
    setErrorAudioPreambulo('');
    setCofreActivo(null);
    setMostrarContinuara(false);
    setFuenteActiva(null);
    setFuentesVisitadas([]);
    setFeedbackFuente(null);
    setErrorPregunta(false);
    setTrampasEncontradas([]);
    setMensajeAuditoria(null);
  };

  const mostrarBotonVolver = videoActual.includes('bucle') && videoActual !== 'modulo1bucle1';

  const finDeVideo = {
    modulo1video1: () => setVideoActual('modulo1bucle1'),
    modulo1video2: () => setVideoActual('modulo1bucle2'),
    modulo1video3: () => setVideoActual('modulo1bucle3'),
    modulo1video4: () => setVideoActual('modulo1bucle4'),
    modulo1video5: () => setVideoActual('modulo1bucle5'),
    modulo1video6: () => setVideoActual('modulo1bucle6'),
    modulo1video7: () => setVideoActual('modulo1bucle7'),
    modulo1video8: () => setVideoActual('modulo1video8_1'),
    modulo1video8_1: manejarFinVideo8_1,
  };

  const tablasAuditoria = TABLAS_POR_COFRE[cofreActivo] ?? [];
  const totalTrampas = tablasAuditoria.reduce(
    (total, tabla) => total + tabla.campos.filter((c) => c.esTrampa).length,
    0,
  );
  const auditoriaCompletada =
    totalTrampas > 0 && trampasEncontradas.length === totalTrampas;

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <video
        key={videoActual}
        ref={(elemento) => {
          if (elemento) elemento.volume = volumen;
        }}
        src={`${BASE}nivel1/${videoActual}.mp4`}
        className="fixed inset-0 w-full h-full object-cover"
        autoPlay
        muted={isMuted}
        playsInline
        controls={false}
        loop={videoActual.includes('bucle')}
        onEnded={finDeVideo[videoActual]}
      />

      {videoActual.includes('bucle') && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex gap-3">
          {mostrarBotonVolver && (
            <button
              onClick={manejarVolver}
              className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-yellow-400/50 rounded-full px-4 py-2 text-sm font-bold text-white hover:bg-black/60 transition-colors"
            >
              ⬅️ Volver
            </button>
          )}
          <button
            onClick={manejarReiniciarNivel}
            className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-yellow-400/50 rounded-full px-4 py-2 text-sm font-bold text-white hover:bg-black/60 transition-colors"
          >
            🏠 Inicio
          </button>
        </div>
      )}

      {videoActual === 'modulo1bucle1' && (
        <div className="absolute bottom-10 right-10 max-w-sm z-50">
          <div className="bg-black/40 backdrop-blur-md border border-yellow-400/50 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Nivel 1: Cazadores del Dolor
            </h2>
            <p className="mb-6 leading-relaxed">
              La teoría quedó atrás. Es hora de ensuciarse las manos con los
              datos reales.
            </p>
            <button
              onClick={() => setVideoActual('modulo1video2')}
              className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Avanzar
            </button>
          </div>
        </div>
      )}

      {videoActual === 'modulo1bucle2' && (
        <div className="absolute bottom-10 left-10 max-w-sm z-50">
          <div className="bg-black/40 backdrop-blur-md border border-yellow-400/50 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              El Umbral
            </h2>
            <p className="mb-6 leading-relaxed">
              Bienvenido, Explorador. Tienes tu primera misión real. Empieza
              ahora.
            </p>
            <button
              onClick={() => {
                setPasoMision(0);
                setErrorAudioPreambulo('');
                setVideoActual('modulo1video3');
              }}
              className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Salvar a PlayStation
            </button>
          </div>
        </div>
      )}

      {videoActual === 'modulo1bucle3' && (
        <div className="absolute top-8 left-6 max-w-sm z-50">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-yellow-400/40 rounded-xl p-4 text-white">
            {pasoMision === 0 && (
              <>
                <h2 className="text-lg font-bold text-yellow-400 mb-3">
                  La misión
                </h2>
                <p className="text-sm leading-relaxed mb-4">
                  PlayStation LATAM está en problemas. Las ventas no están
                  cumpliendo las expectativas y la gerencia exige resultados.
                  Se vienen decisiones difíciles: recortes, despidos… pero
                  también ascensos. Tu área está bajo evaluación. Y lo que
                  hagas desde ahora puede cambiarlo todo.
                </p>
                <audio
                  ref={(elemento) => {
                    audioPreambuloRef.current = elemento;
                    if (elemento) elemento.volume = volumen;
                  }}
                  src={AUDIO_PREAMBULO_PLAYSTATION}
                  muted={isMuted}
                  onError={() =>
                    setErrorAudioPreambulo(
                      'El audio todavía no está disponible. Puedes continuar leyendo.',
                    )
                  }
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={reproducirAudioPreambulo}
                    className="border border-yellow-400/50 rounded-lg px-3 py-1.5 text-xs hover:bg-yellow-400/10 transition-colors"
                    type="button"
                  >
                    🔊 Escuchar Audio
                  </button>
                  <button
                    onClick={() => setPasoMision(1)}
                    className="bg-yellow-400 text-black font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-yellow-300 transition-colors"
                    type="button"
                  >
                    Continuar
                  </button>
                </div>
                {errorAudioPreambulo && (
                  <p className="mt-2 text-xs text-yellow-200" role="status">
                    {errorAudioPreambulo}
                  </p>
                )}
              </>
            )}

            {pasoMision === 1 && (
              <>
                <h2 className="text-lg font-bold text-yellow-400 mb-2">
                  El comité de gerencia necesita resultados y hay tres
                  problemas sobre la mesa.
                </h2>
                <p className="text-xs leading-snug mb-3">
                  <strong className="block">
                    Elige cuál vas a resolver.
                  </strong>{' '}
                  Será tu misión durante los 5 módulos, hasta construir tu
                  solución final.
                </p>
                <audio
                  ref={(elemento) => {
                    audioContextoRef.current = elemento;
                    if (elemento) elemento.volume = volumen;
                  }}
                  src={AUDIO_CONTEXTO_GENERAL}
                  muted={isMuted}
                />
                <button
                  onClick={() => audioContextoRef.current?.play()}
                  className="mb-3 border border-yellow-400/50 rounded-lg px-3 py-1.5 text-xs hover:bg-yellow-400/10 transition-colors"
                  type="button"
                >
                  🔊 Escuchar Audio
                </button>
                <div className="flex items-start gap-2 bg-black/60 border border-yellow-400 rounded-lg px-3 py-2 mb-3 text-xs text-yellow-200">
                  <span className="text-base leading-none">⚠️</span>
                  <p>
                    El caso que elijas se trabajará durante los cinco módulos,
                    hasta construir tu solución final.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {COFRES.map(({ valor, etiqueta }) => (
                    <button
                      key={valor}
                      onClick={() => manejarElegirCofre(valor)}
                      className="border border-yellow-400/50 rounded-lg px-3 py-2 text-left text-sm font-bold hover:bg-yellow-400/10 transition-colors"
                    >
                      {etiqueta}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {cofreActivo && videoActual === 'modulo1bucle3' && (
        <div className="absolute top-8 right-6 max-w-md bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-yellow-400/40 z-50 text-white">
          <audio
            key={cofreActivo}
            ref={(elemento) => {
              audioCofreRef.current = elemento;
              if (elemento) elemento.volume = volumen;
            }}
            src={AUDIOS_COFRE[cofreActivo]}
            autoPlay
            muted={isMuted}
          />
          <div className="text-xs leading-relaxed mb-3 max-h-48 overflow-y-auto pr-1">
            {datosCofres[cofreActivo].historia}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => audioCofreRef.current?.play()}
              className="border border-yellow-400/50 rounded-lg px-3 py-1.5 text-sm hover:bg-yellow-400/10 transition-colors"
            >
              🔊 Escuchar Audio
            </button>
            <button
              onClick={manejarInvestigarCaso}
              className="bg-yellow-400 text-black font-bold px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-300 transition-colors shadow-[0_0_15px_rgba(250,204,21,0.5)]"
            >
              Investigar Caso
            </button>
          </div>
        </div>
      )}

      {videoActual === 'modulo1bucle4' && (
        <>
          <div className="absolute right-20 top-1/4 flex flex-col gap-4 z-50 w-80">
            {!fuenteActiva && (
              <div className="bg-black/40 backdrop-blur-md border border-cyan-400/50 rounded-xl p-6 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                <p className="text-cyan-300 font-semibold mb-4 leading-relaxed">
                  Para entender qué es lo que está pasando con PlayStation.
                  Vamos a entrevistar a:
                </p>
                <div className="flex flex-col gap-3">
                  {FUENTES.map(({ valor, etiqueta }) => (
                    <button
                      key={valor}
                      onClick={() => manejarSeleccionarFuente(valor)}
                      className="flex items-center justify-between border border-cyan-400/50 rounded-lg px-4 py-3 text-left hover:bg-cyan-400/10 transition-colors"
                    >
                      <span>{etiqueta}</span>
                      {fuentesVisitadas.includes(valor) && <span>✅</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {feedbackFuente && (
              <div className="bg-black/60 border border-cyan-400 rounded-lg p-6 text-white shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                <p className="text-xs uppercase tracking-widest text-cyan-400 mb-2">
                  Pista obtenida
                </p>
                <p className="mb-6 leading-relaxed">{feedbackFuente}</p>
                <button
                  onClick={manejarCerrarConexion}
                  className="border border-cyan-400/50 rounded-lg px-4 py-2 hover:bg-cyan-400/10 transition-colors"
                >
                  Cerrar Conexión
                </button>
              </div>
            )}

            {fuentesVisitadas.length === 3 && (
              <button
                onClick={() => setVideoActual('modulo1video5')}
                className="bg-cyan-400 text-black font-bold px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-cyan-300 transition-colors animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.6)]"
              >
                Analizar Datasets
              </button>
            )}
          </div>

          {fuenteActiva && !feedbackFuente && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
              <div
                className={`max-h-[calc(100dvh-2rem)] w-full overflow-y-auto rounded-lg border border-cyan-400 bg-black/80 p-4 text-white shadow-[0_0_20px_rgba(34,211,238,0.5)] backdrop-blur-md sm:p-6 ${
                  VIDEO_FUENTE_VERTICAL[cofreActivo]?.includes(fuenteActiva)
                    ? 'max-w-5xl'
                    : 'max-w-xl'
                }`}
              >
                {datosCofres[cofreActivo]?.[fuenteActiva] ? (
                  <>
                    <div
                      className={
                        VIDEO_FUENTE_VERTICAL[cofreActivo]?.includes(fuenteActiva)
                          ? 'grid items-start gap-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'
                          : ''
                      }
                    >
                      <div
                        className={
                          VIDEO_FUENTE_VERTICAL[cofreActivo]?.includes(fuenteActiva)
                            ? 'flex justify-center'
                            : ''
                        }
                      >
                        <video
                          key={fuenteActiva}
                          src={obtenerVideoFuente(cofreActivo, fuenteActiva)}
                          controls
                          className={`rounded-lg shadow-lg bg-black ${
                            VIDEO_FUENTE_VERTICAL[cofreActivo]?.includes(fuenteActiva)
                              ? 'h-[min(70vh,42rem)] w-auto max-w-full aspect-[9/16] object-contain'
                              : 'w-full aspect-video object-cover'
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-300 mt-4 max-h-32 overflow-y-auto italic border-l-2 border-cyan-500 pl-3 md:mt-0">
                          "{datosCofres[cofreActivo][fuenteActiva].linea}"
                        </p>
                        <p className="text-cyan-300 font-bold text-sm uppercase tracking-wide mt-4 mb-2">
                          ¿Qué preguntaría un investigador?
                        </p>
                        <div className="flex flex-col gap-3">
                          <button
                            onClick={() => manejarResponderPregunta(true)}
                            className="border border-cyan-400/50 rounded-lg px-4 py-3 text-left hover:bg-cyan-400/10 transition-colors"
                          >
                            {datosCofres[cofreActivo][fuenteActiva].correcta}
                          </button>
                          <button
                            onClick={() => manejarResponderPregunta(false)}
                            className={`flex items-center justify-between gap-2 border rounded-lg px-4 py-3 text-left transition-colors ${
                              errorPregunta
                                ? 'border-red-500 bg-red-900/30'
                                : 'border-cyan-400/50 hover:bg-cyan-400/10'
                            }`}
                          >
                            <span>
                              {datosCofres[cofreActivo][fuenteActiva].incorrecta}
                            </span>
                            {errorPregunta && (
                              <span className="text-red-500 font-bold text-2xl leading-none">
                                ❌
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-6">
                      Esta fuente aún no tiene información disponible.
                    </p>
                    <button
                      onClick={() => setFuenteActiva(null)}
                      className="border border-cyan-400/50 rounded-lg px-4 py-2 hover:bg-cyan-400/10 transition-colors"
                    >
                      Volver
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {videoActual === 'modulo1bucle5' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-black/80 backdrop-blur-md max-w-5xl max-h-[80vh] overflow-y-auto p-6 rounded-xl border border-cyan-500 text-white">
            {auditoriaCompletada ? (
              <div className="text-center py-10">
                <h2 className="text-3xl font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] mb-6">
                  ¡Bases de Datos Depuradas!
                </h2>
                <button
                  onClick={() => setVideoActual('modulo1video6')}
                  className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Generar Reporte
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-cyan-400 mb-4 tracking-widest uppercase text-center">
                  Auditoría de Datos: Encuentra las {totalTrampas} Trampas
                </h2>

                {mensajeAuditoria && (
                  <div className="bg-amber-500/20 border border-amber-400 text-amber-200 text-sm rounded-lg px-4 py-3 mb-4 text-center">
                    {mensajeAuditoria}
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-3">
                  {tablasAuditoria.map((tabla) => (
                    <div
                      key={tabla.nombre}
                      className="bg-cyan-950/30 border border-cyan-700 rounded-lg p-4"
                    >
                      <h3 className="text-cyan-300 font-bold font-mono text-sm mb-2">
                        {tabla.nombre}
                      </h3>

                      {tabla.descripcion && (
                        <p className="text-gray-400 text-xs italic mb-3">
                          {tabla.descripcion}
                        </p>
                      )}

                      <div className="flex flex-col gap-2">
                        {tabla.campos.map((campo) => {
                          const detectado = trampasEncontradas.includes(
                            campo.id,
                          );
                          return (
                            <div
                              key={campo.id}
                              className="flex items-center justify-between gap-2 bg-black/30 rounded px-3 py-2 min-h-[52px]"
                            >
                              <div className="flex flex-col">
                                <span className="text-white font-mono text-sm">
                                  {campo.nombre}
                                </span>
                                <span className="text-gray-400 text-xs italic ml-2">
                                  {campo.detalle}
                                </span>
                              </div>
                              <button
                                onClick={() => manejarMarcarCampo(campo)}
                                disabled={detectado}
                                className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded transition-colors ${
                                  detectado
                                    ? 'bg-green-600 text-white cursor-default'
                                    : 'bg-red-900/40 border border-red-600/50 text-red-300 hover:bg-red-800/50'
                                }`}
                              >
                                {detectado ? '✅ ¡Trampa detectada!' : '⚠️ Trampa'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {videoActual === 'modulo1bucle6' && (
        <div className="absolute bottom-10 left-10 max-w-sm bg-black/50 backdrop-blur-md border border-yellow-400/50 p-6 rounded-xl text-white z-50">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Ruta Desbloqueada
          </h2>
          <p className="mb-6 leading-relaxed">
            El dataset ha sido validado con éxito. El portal hacia la
            siguiente dimensión de datos está estable y listo para cruzar.
          </p>
          <button
            onClick={() => setVideoActual('modulo1video7')}
            className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Cruzar el umbral
          </button>
        </div>
      )}

      {videoActual === 'modulo1bucle7' && (
        <div className="bg-red-950/80 backdrop-blur-md border border-red-500 rounded-xl p-8 text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
          <h2 className="text-red-400 font-bold text-2xl mb-4">
            ⚠️ ADVERTENCIA CRÍTICA
          </h2>
          <p className="mb-2">
            El entorno de la base de datos ha colapsado. La nueva ruta es
            inestable y la gravedad del sistema está fallando.
          </p>
          <button
            onClick={() => setVideoActual('modulo1video8')}
            className="bg-red-800 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg mt-6 transition-all"
          >
            Cruzar hacia lo desconocido
          </button>
        </div>
      )}

      {mostrarContinuara && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100] transition-opacity duration-1000">
          <h1 className="text-5xl md:text-7xl font-light tracking-[0.3em] text-white">
            CONTINUARÁ...
          </h1>
          <p className="text-gray-500 mt-8 tracking-widest text-sm">
            FIN DE LA FASE 1
          </p>
        </div>
      )}
    </div>
  );
}

export default Mision1;
