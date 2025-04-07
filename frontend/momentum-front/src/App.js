import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./components/table/Table";
import Registrousuario from "./components/registrousuario/Registrousuario";
import {Routes, Route} from 'react-router-dom';

function App() {
    return (
        <>
        <Routes> 
            <Route path='/' element={<Table/>}/>
            <Route path='/Registrousuario' element={<Registrousuario/>}/>
            <Route/>
        </Routes>


        </>
    );
}

export default App;
