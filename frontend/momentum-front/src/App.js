import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./components/table/Table";
import SignupUser from "./components/signupuser/SignupUser";
import {Routes, Route} from 'react-router-dom';
import LoginUser from "./components/modifyuser/LoginUser";

function App() {
    return (
        <>
        <Routes> 
            <Route path='/' element={<Table/>}/>
            <Route path='/SignupUser' element={<SignupUser/>}/>
            <Route path='/ModifyUser' element={<ModifyUser/>}/>
        </Routes>


        </>
    );
}

export default App;
