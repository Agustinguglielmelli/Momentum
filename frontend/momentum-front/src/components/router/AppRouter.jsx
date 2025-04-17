
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
import MyProfile from "../myprofile/MyProfile";
import PublicOnlyRoute from "../publicRoute/PublicRoute";


function AppRouter() {
    return (
        <>
        <Routes>

            <Route path='/' element={
                <PublicOnlyRoute>
                    <SignupUser />
                </PublicOnlyRoute>
            } />
            <Route path='/signup' element={
                <PublicOnlyRoute>
                    <SignupUser />
                </PublicOnlyRoute>
            } />
            <Route path='/login' element={
                <PublicOnlyRoute>
                    <LoginUser />
                </PublicOnlyRoute>
            } />

            <Route path='/home' element={
                <PrivateRoute>
                    <Home/>
                </PrivateRoute>
            } />
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
            <Route path='/miperfil' element={
                <PrivateRoute>
                    <MyProfile/>
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