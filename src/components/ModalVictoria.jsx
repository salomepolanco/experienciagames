import { useState } from 'react';

function InsigniaMinero({ casoNombre }) {
  return (
    <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border-4 border-yellow-300/80 bg-[radial-gradient(circle,rgba(250,204,21,0.3)_0%,rgba(113,63,18,0.3)_55%,rgba(15,23,42,0.65)_100%)] p-4 text-center shadow-[0_0_35px_rgba(250,204,21,0.35),inset_0_0_24px_rgba(250,204,21,0.2)]">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-yellow-200/40 px-3">
        <span aria-hidden="true" className="mb-1 text-3xl">
          ✦
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-200">
          Minero de Datos
        </span>
        <span className="mt-2 text-sm font-extrabold leading-tight text-white">
          {casoNombre}
        </span>
      </div>
    </div>
  );
}

function ModalVictoria({ casoNombre, onComplete }) {
  const [videoEnBucle, setVideoEnBucle] = useState(false);

  return (
    <section
      aria-label="Escena 6: Misión cumplida"
      className="fixed inset-0 z-50 isolate overflow-y-auto bg-black/10 text-white"
    >
      <video
        key={videoEnBucle ? 'victoria-bucle' : 'victoria-accion'}
        aria-hidden="true"
        autoPlay
        loop={videoEnBucle}
        muted
        playsInline
        onEnded={() => setVideoEnBucle(true)}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      >
        <source
          src={`${import.meta.env.BASE_URL}nivel2/${
            videoEnBucle ? 'modulo2bucle6.mp4' : 'modulo2video6.mp4'
          }`}
          type="video/mp4"
        />
      </video>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/10" />

      <div className="flex min-h-screen items-center justify-start p-4 pl-[clamp(1rem,8vw,7rem)] sm:pr-8">
        <section
          aria-labelledby="modal-victoria-titulo"
          aria-modal="true"
          className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-yellow-400/70 bg-gray-900/35 p-5 text-center shadow-lg shadow-yellow-900/25 backdrop-blur-lg sm:max-h-[calc(100dvh-4rem)] sm:p-6"
          role="dialog"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-yellow-200">
            Módulo 2 · Misión finalizada
          </p>
          <h1
            className="mb-3 text-4xl font-black tracking-wide text-yellow-400 drop-shadow-[0_0_16px_rgba(250,204,21,0.4)] sm:text-5xl"
            id="modal-victoria-titulo"
          >
            MISIÓN CUMPLIDA.
          </h1>
          <p className="mb-7 text-lg text-yellow-100">
            Has entrenado y leído tu primer modelo.
          </p>

          <InsigniaMinero casoNombre={casoNombre} />

          <p className="mt-7 font-mono text-xl font-bold tracking-[0.35em] text-yellow-300">
            CONTINUARÁ…
          </p>
          <button
            className="mt-5 rounded-xl border border-yellow-200/70 bg-yellow-400 px-6 py-3 font-extrabold text-gray-950 shadow-[0_0_24px_rgba(250,204,21,0.35)] transition hover:bg-yellow-300 hover:shadow-[0_0_34px_rgba(250,204,21,0.55)] focus:outline-none focus:ring-2 focus:ring-yellow-100"
            onClick={() => onComplete?.()}
            type="button"
          >
            Volver al menú principal
          </button>
        </section>
      </div>
    </section>
  );
}

export default ModalVictoria;
