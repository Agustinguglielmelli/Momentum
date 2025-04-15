
import {Routes, Route, Navigate} from 'react-router-dom';
import ModifyUser from '../modifyuser/ModifyUser';
import LoginUser from '../loginuser/LoginUser';
import Home from '../home/Home';
import PrivateRoute from "../privateroute/PrivateRoute";
import SignupUser from "../signupuser/SignupUser";
import RecreationalPostForm from "../post/recreationalpostform/RecreationalPostForm";
import TrainingPlanPostForm from "../post/trainingplanpostform/TrainingPlanPostForm";
import Navbar from "../navbar/Navbar";
import {RecreationalPost} from "../post/recreationalpost/RecreationalPost";

function AppRouter() {
    return (
        <>
        <Routes> 

            <Route path='/' element={<SignupUser />} />
            <Route path='/signup' element={<SignupUser />} />
            <Route path='/login' element={<LoginUser/>}></Route>
            <Route path='/home' element={<Navbar/>}></Route>

            <Route path='/miperfil/createTrainingPlan' element={
                <PrivateRoute>
                    <TrainingPlanPostForm />
                </PrivateRoute>
            } />
            <Route path='/miperfil/recreationalPost' element={
                <PrivateRoute>
                    <RecreationalPost/>
                </PrivateRoute>
            } />
            <Route path='/miperfil/createRecreationalPost' element={
                <PrivateRoute>
                    <RecreationalPostForm />
                </PrivateRoute>
            } />
            <Route path='/ModifyUser/:id' element={<ModifyUser/>}></Route>
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