import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./components/table/Table";
import Registrousuario from "./components/registrousuario/Registrousuario";

function App() {
    return (<div className="App">
            <header className="App-header">
                <Table/>
                <Registrousuario/>
            </header>
        </div>);
}

export default App;
