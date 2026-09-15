import { createContext, useContext, useState } from 'react';

const SonidoContext = createContext(null);

export function SonidoProvider({ children }) {
  const [isMuted, setIsMuted] = useState(true);
  const [volumen, setVolumen] = useState(1);

  const toggleMuted = () => setIsMuted((previo) => !previo);

  const cambiarVolumen = (nuevoVolumen) => {
    setVolumen(nuevoVolumen);
    setIsMuted(nuevoVolumen === 0);
  };

  return (
    <SonidoContext.Provider
      value={{ isMuted, toggleMuted, volumen, cambiarVolumen }}
    >
      {children}
    </SonidoContext.Provider>
  );
}

export function useSonido() {
  const contexto = useContext(SonidoContext);
  if (!contexto) {
    throw new Error('useSonido debe usarse dentro de un SonidoProvider');
  }
  return contexto;
}
