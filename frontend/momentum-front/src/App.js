import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./components/table/Table";
import SignupUser from "./components/signupuser/SignupUser";
import {Routes, Route} from 'react-router-dom';
import ModifyUser from './components/modifyuser/ModifyUser';
import LoginUser from './components/loginuser/LoginUser';
import Home from './components/home/Home';

function App() {
    return (
        <>
        <Routes> 
            <Route path='/' element={<SignupUser />} />
            <Route path='/ModifyUser/:id' element={<ModifyUser/>}></Route>
            <Route path='/Login' element={<LoginUser/>}></Route>
            <Route path='/home' element={<Home/>}></Route>

        </Routes>


        </>
    );
}

export default App;
