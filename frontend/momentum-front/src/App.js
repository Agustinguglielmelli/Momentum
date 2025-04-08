import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./components/table/Table";
import SignupUser from "./components/signupuser/SignupUser";
import {Routes, Route} from 'react-router-dom';
import ModifyUser from './components/modifyuser/ModifyUser';

function App() {
    return (
        <>
        <Routes> 
            <Route path='/' element={<Table/>}/>
            <Route path='/SignupUser' element={<SignupUser/>}/>
            <Route path='/ModifyUser' element={<ModifyUser/>}></Route>
        </Routes>


        </>
    );
}

export default App;
