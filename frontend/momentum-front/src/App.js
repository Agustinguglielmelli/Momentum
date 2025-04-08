import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./components/table/Table";
import SignupUser from "./components/signupuser/SignupUser";
import {Routes, Route} from 'react-router-dom';

function App() {
    return (
        <>
        <Routes> 
            <Route path='/' element={<Table/>}/>
            <Route path='/SignupUser' element={<SignupUser/>}/>
            <Route path='/LoginUser' element={<LoginUser/>}/>
        </Routes>


        </>
    );
}

export default App;
