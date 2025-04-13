import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/Navbar';
import AppRouter from './components/router/AppRouter'

function App() {
    return (
        <>
        <Navbar/>
        <AppRouter/>
        </>
    );
}

export default App;
