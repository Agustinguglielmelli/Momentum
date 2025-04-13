
import SignupUser from "./components/signupuser/SignupUser";
import {Routes, Route, Navigate} from 'react-router-dom';
import ModifyUser from './components/modifyuser/ModifyUser';
import LoginUser from './components/loginuser/LoginUser';
import Home from './components/home/Home';
import PrivateRoute from "./components/privateroute/PrivateRoute";

function AppRouter() {
    return (
        <>
        <Routes> 

            <Route path='/' element={<SignupUser />} />
            <Route path='/ModifyUser/:id' element={<ModifyUser/>}></Route>
            <Route path='/Login' element={<LoginUser/>}></Route>
            <Route path='/*' element={<Navigate to='/'/>}/>
            //Navigate se usa para que cuando escribas una ruta cualquiera no definida, directamente te mande a '/'
            <Route path='/home' element={
                <PrivateRoute>
                    <Home/>
                </PrivateRoute>
            }>
            </Route>

        </Routes>
        </>
    );
}
export default AppRouter;