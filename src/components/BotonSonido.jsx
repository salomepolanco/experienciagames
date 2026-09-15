import { useSonido } from '../context/SonidoContext.jsx';

function BotonSonido() {
  const { isMuted, toggleMuted, volumen, cambiarVolumen } = useSonido();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-black/40 backdrop-blur-md border border-yellow-400/50 rounded-full pl-4 pr-5 py-3">
      <button
        onClick={toggleMuted}
        aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
        className="text-2xl leading-none hover:scale-110 transition-transform"
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volumen}
        onChange={(evento) => cambiarVolumen(Number(evento.target.value))}
        aria-label="Volumen"
        className="w-24 accent-yellow-400 cursor-pointer"
      />
    </div>
  );
}

export default BotonSonido;
