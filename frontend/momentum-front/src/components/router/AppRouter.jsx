
import {Routes, Route, Navigate} from 'react-router-dom';
import ModifyUser from '../modifyuser/ModifyUser';
import LoginUser from '../loginuser/LoginUser';
import Home from '../home/Home';
import PrivateRoute from "../privateroute/PrivateRoute";
import SignupUser from "../signupuser/SignupUser";
import RecreationalPost from "../recreationalpost/RecreationalPost";

function AppRouter() {
    return (
        <>
        <Routes> 

{/*
            <Route path='/' element={<SignupUser />} />
*/}
            <Route path='/miperfil/recreationalPost' element={<RecreationalPost />} />
            <Route path='/ModifyUser/:id' element={<ModifyUser/>}></Route>
            <Route path='/Login' element={<LoginUser/>}></Route>
            <Route path='/*' element={<Navigate to='/'/>}/>

{/*
            Navigate se usa para que cuando escribas una ruta cualquiera no definida, directamente te mande a '/'
*/}
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