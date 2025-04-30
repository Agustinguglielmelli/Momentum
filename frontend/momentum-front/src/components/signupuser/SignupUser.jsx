import Button from "../button/Button"; //esta bien importado cuando es "../button/Button"
import axios from "axios";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {handleFileChangeImg} from "../../api/functions";


function SignupUser() {
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault(); //

        const userData = {
            username, email, password, profilePicture: base64, role
        }

        console.log("Datos a enviar:", userData);

        try {
            await axios.post("http://localhost:8080/auth/signup", userData, {
            });
            navigate("/Login")
        } catch (error) {
            console.error("Error al cargar usuario:", error);
        }

    }

    const [username, setusername] = useState(""); // Estos set se encargan de cambiar el contenido de esos campos
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [base64, setBase64] = useState(''); // profile picture
    const [role, setRole] = useState(null);


    return (
    <div className="container">
        <Link to={"/"} className="btn btn-primary">Back</Link>
        <div className="w-50 mx-auto border p-5 shadow bg-body-secondary border-light-secondary rounded-lg">
            <h1>Sign Up</h1>
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


                <div className="mb-3">
                    <label htmlFor="profilePicture">Profile Picture:</label>
                    <input type="file" id="profilePicture" name="profilePicture"
                           accept="image/*"
                           onChange={(e) => handleFileChangeImg(e, setBase64)} />
                    {base64 && ( // si bas64 no es null, mostra lo de adentro del parentesis
                        <div>
                            <p>Preview:</p>
                            <img src={base64} alt="preview" style={{ maxWidth: '300px' }} />
                        </div>
                    )}

                </div>

               {<div className="mb-3">
                    <input
                        type="radio"
                        name="role"
                        value="RUNNER"
                        onChange={(e) => setRole(e.target.value)}
                    /> Runner
                    <input type="radio"
                           name="role"
                           value="COACH"
                            onChange={(e) => setRole(e.target.value)}
                    /> Coach
                </div>
               }

                <Button type="submit" className="btn-primary" text="Submit"></Button>
            </form>
        </div>
    </div>);
}

export default SignupUser;

// Este es un componente que representa un formulario de registro de usuario.