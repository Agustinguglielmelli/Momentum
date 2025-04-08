import Button from "../button/Button";
import axios from "axios";
import React, {useState} from "react";
import {Link} from "react-router-dom"; //esta bien importado cuando es "../button/Button"


function SignupUser() {

    async function handleSubmit(event) {
        event.preventDefault(); //

        const userData = {
            username, email, password, profile_picture: base64, role
        }

        console.log("Datos a enviar:", userData);

        try {
            const response = await axios.post("http://localhost:8080/usuario", userData, {
            });
        } catch (error) {
            console.error("Error al cargar usuario:", error);
        }

    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file.');
                return;
            }

            try {
                const base64String = await convertToBase64(file);
                setBase64(base64String);
                console.log('Base64:', base64String);

            } catch (error) {
                console.error('Error converting file:', error);
            }
        }
    };

    const [username, setusername] = useState(""); // Estos set se encargan de cambiar el contenido de esos campos
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [base64, setBase64] = useState(''); // profile picture
    const [role, setRole] = useState(null);


    return (
    <div >
        <Link to='/' className="btn btn-primary">Back</Link>
        <div className="w-50 mx-auto border p-5 shadow bg-body-secondary border-light-secondary rounded-lg">
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


                <div className="mb-3">
                    <label htmlFor="profilePicture">Profile Picture:</label>
                    <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleFileChange} required/>
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
                        required
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