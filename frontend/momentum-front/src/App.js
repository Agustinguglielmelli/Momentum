import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./components/table/Table";
import Registrousuario from "./components/registrousuario/Registrousuario";
import FileUpload from "./components/imgtobase64/imgtobase64";

function App() {
    return (<div className="App">
            <header className="App-header">
                <Table/>
                <Registrousuario/>
                <FileUpload/>
            </header>
        </div>);
}

export default App;
