import Button from "../button/Button";
import axios from "axios";
import {useState} from "react"; //esta bien importado cuando es "../button/Button"


function Registrousuario() {

    async function handleSubmit(event) {
        event.preventDefault(); //

        const userData = {
            username, email, password, profile_picture
        }

        console.log("Datos a enviar:", userData);

        try {
            const response = await axios.post("http://localhost:8080/usuario", userData, {
            });
        } catch (error) {
            console.error("Error al cargar usuario:", error);
        }

    }

    const [username, setusername] = useState(""); // Estos set se encargan de cambiar el contenido de esos campos
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [profile_picture, setProfile_picture] = useState("");


    return (<div className="w-50 mx-auto border p-5 shadow bg-body-secondary border-light-secondary rounded-lg">
        <h1>Registro de Usuario</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username: </label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)} // e.target.value es el contenido del input que se escribe
                    required // Hay que completar el campor para poder darle submit
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address: </label>
                <input type="email"
                       className="form-control"
                       id="email"
                       aria-describedby="emailHelp"
                       value={email}
                       onChange={(e) => setemail(e.target.value)}
                       required
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password: </label>
                <input type="password"
                       className="form-control"
                       id="password"
                       value={password}
                       onChange={(e) => setpassword(e.target.value)}
                        required
                />
            </div>
{
/*
            <div className="mb-3">
                <label htmlFor="profilePicture">Profile Picture:</label>
                <input type="file" id="profilePicture" name="profilePicture" accept="image/!*"/>
                {profilePicture && <img src={profilePicture} alt="Profile" width="100"/>}
            </div>

            <div className="mb-3">
                <input type="radio" name="role" value="Runner"/> Runner
                <input type="radio" name="role" value="Coach"/> Coach
            </div>
    */
}


            <Button type="submit" className="btn-primary" text="Submit"></Button>
        </form>
    </div>);
}

export default Registrousuario;

// Este es un componente que representa un formulario de registro de usuario.