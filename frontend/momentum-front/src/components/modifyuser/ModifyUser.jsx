import Button from "../button/Button";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";

function ModifyUser () {
    const navigate = useNavigate();

    useEffect(() => { //con esta funcion nos traemos los datos del usuario
        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:8080/usuario`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                const data = response.data;
                setusername(data.username || "");
                setemail(data.email || "");
                setpassword(data.password); // No mostramos la contraseña real por seguridad
                setBase64(data.profilePicture || "");

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        fetchUserData();
    }, []);

    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [base64, setBase64] = useState('');


    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            try {
                const base64String = await convertToBase64(file);
                setBase64(base64String);
                console.log('Base64:', base64String);
            } catch (error) {
                console.error('Error converting file:', error);
            }
        } else {
            alert('Please upload an image file.');
        }
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const userData = {
            username,
            email,
            password,
            profilePicture: base64
        };

        try {
            const response = await axios.put(`http://localhost:8080/usuario/modify`, userData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            console.log("Usuario actualizado:", response.data);
            navigate("/myProfile");
        } catch (error) {
            console.error("Error al cargar usuario:", error);
        }

    }

    return (
        <div>
            <Link to='/' className="btn btn-primary">Back</Link>
            <div className="w-50 mx-auto border p-5 shadow bg-body-secondary border-light-secondary rounded-lg">
                <h1>Update User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">New username: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">New email address: </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New password: </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="profilePicture">New profile picture:</label>
                        <input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {base64 && (
                            <div>
                                <p>Preview:</p>
                                <img src={base64} alt="preview" style={{ maxWidth: '300px' }} />
                            </div>
                        )}
                    </div>

                    <Button type="submit" className="btn-primary" text="Submit" />
                </form>
            </div>
        </div>
    );
}

export default ModifyUser;



