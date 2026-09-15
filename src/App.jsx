import { Routes, Route } from 'react-router-dom';
import { SonidoProvider } from './context/SonidoContext.jsx';
import BotonSonido from './components/BotonSonido.jsx';
import Home from './Home.jsx';
import SelectorNiveles from './SelectorNiveles.jsx';
import Nivel0 from './Nivel0.jsx';
import Mision1 from './Mision1.jsx';
import Progreso from './Progreso.jsx';

function App() {
  return (
    <SonidoProvider>
      <BotonSonido />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/niveles" element={<SelectorNiveles />} />
        <Route path="/nivel0" element={<Nivel0 />} />
        <Route path="/mision1" element={<Mision1 />} />
        <Route path="/progreso" element={<Progreso />} />
      </Routes>
    </SonidoProvider>
  );
}

export default App;
