import Button from "../button/Button";
import axios from "axios"; //esta bien importado cuando es "../button/Button"


async function addUser(username, email, password, profilePicture, role) {
    const userData = {
        username, email, password, profilePicture, role
    }
    await axios.post("http://localhost:8080/usuario", {userData})
}

function Registrousuario({username, email, password, profilePicture}) {

    return (<div className="w-50 mx-auto border p-5 shadow bg-body-secondary border-light-secondary rounded-lg">
        <h1>Registro de Usuario</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username: </label>
                <input type="text" className="form-control" id="username" value={username}/>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address: </label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password: </label>
                <input type="password" className="form-control" id="password" value={password}/>
            </div>

            <div className="mb-3">
                <label htmlFor="profilePicture">Profile Picture:</label>
                <input type="file" id="profilePicture" name="profilePicture" accept="image/*"/>
                {profilePicture && <img src={profilePicture} alt="Profile" width="100"/>}
            </div>

            <div className="mb-3">
                <input type="radio" name="role" value="Runner"/> Runner
                <input type="radio" name="role" value="Coach"/> Coach
            </div>


            <Button className="btn-primary" onClick={() => addUser()} text="Submit"></Button>
        </form>
    </div>);
}

export default Registrousuario;

// Este es un componente que representa un formulario de registro de usuario.