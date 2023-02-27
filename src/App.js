import { Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Profesores from './pages/Profesores'
import ProfesoresAgregar from './components/ProfesoresAgregar';
import BarraSuperior from './components/BarraSuperior';
import ProfesoresModificar from './components/ProfesoresModificar';
import Escolaridades from './components/Escolaridades';
import General from './components/General';
import Experiencia from './components/Experiencia';
import Otros from './components/Otros';
import CrearCurriculum from './pages/CrearCurriculum';
import VerCurriculum from './pages/VerCurriculum';
import ModificarCurriculum from './pages/ModificarCurriculum';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element = { <BarraSuperior /> } >
          <Route index element={<Home></Home>} />
          <Route path='profesores'>
            <Route index element = { <Profesores /> }/>
            <Route path='agregar' element = { <ProfesoresAgregar /> }/>
            <Route path='modificar/:c' element= { <ProfesoresModificar />}/>
            <Route path='curriculum/:id'>
                <Route path='general' element={<General />}></Route>
                <Route path='escolaridades' element={<Escolaridades />}></Route>
                <Route path='experiencia' element={<Experiencia />}></Route>
                <Route path='otros' element={<Otros />}></Route>
                <Route path='crear' element={<CrearCurriculum />}></Route>
                <Route path='ver' element={<VerCurriculum />}></Route>
                <Route path='modificar' element={<ModificarCurriculum />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
