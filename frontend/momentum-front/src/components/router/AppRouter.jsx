
import {Routes, Route, Navigate} from 'react-router-dom';
import ModifyUser from '../modifyuser/ModifyUser';
import LoginUser from '../loginuser/LoginUser';
import Home from '../home/Home';
import PrivateRoute from "../privateroute/PrivateRoute";
import SignupUser from "../signupuser/SignupUser";
import RecreationalPostForm from "../post/recreationalpostform/RecreationalPostForm";
import TrainingPlanPostForm from "../post/trainingplanpostform/TrainingPlanPostForm";
import {RecreationalPost} from "../post/recreationalpost/RecreationalPost";
import MyProfile from "../myprofile/MyProfile";
import PublicOnlyRoute from "../publicRoute/PublicRoute";
import MyEvents from '../myevents/MyEvents';
import { EventPostRunner } from '../post/eventpost/EventPostRunner';
import EventPostForm from '../post/eventpostform/EventPostForm';
import UpdateEventPostForm from '../post/eventpost/updateeventpostform/UpdateEventPostForm';
import HomePage from "../beforehome/HomePage";
import MapaConBuscador from '../mapforevents/MapForEvents';
import MyMapComponent from '../mapforevents/MyMapComponent';


function AppRouter() {
    return (
        <>
        <Routes>
            <Route path='/' element={
                <PublicOnlyRoute>
                    <HomePage />
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
            <Route path='/myprofile/createTrainingPlan' element={
                <PrivateRoute>
                    <TrainingPlanPostForm />
                </PrivateRoute>
            } />
            <Route path='/myprofile/recreationalPost' element={
                <PrivateRoute>
                    <RecreationalPost/>
                </PrivateRoute>
            } />
            <Route path='/myprofile/createRecreationalPost' element={
                <PrivateRoute>
                    <RecreationalPostForm />
                </PrivateRoute>
            } />
            <Route path='/myprofile' element={
                <PrivateRoute>
                    <MyProfile/>
                </PrivateRoute>
            } />
            <Route path='/myprofile/modifyUser' element={
                <PrivateRoute>
                    <ModifyUser/>
                </PrivateRoute>
            } />
            <Route path='/events' element={
                <PrivateRoute>
                    <MyEvents/>
                </PrivateRoute>
            } />
              <Route path='/events/event' element={
                <PrivateRoute>
                    <EventPostRunner/>
                </PrivateRoute>
            } />
            <Route path='/events/createEvent' element={
                <PrivateRoute>
                    <EventPostForm/>
                </PrivateRoute>
            } />
            <Route path="/update-event/:event_id" element={
                <PrivateRoute>
                <UpdateEventPostForm />
                </PrivateRoute>
            } />
            <Route path='/events/searchEvent' element={
                <PrivateRoute>
                    <MyMapComponent/>
                </PrivateRoute>
            } />
            
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