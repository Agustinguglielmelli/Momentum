import Button from "../button/Button";
import axios from "axios";
import React, {useState} from "react";
import {Link} from "react-router-dom"; 

function LoginUser() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userData = {
        email, password
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            console.log("enviando", userData);
            const response = await axios.post(`http://localhost:8080/auth/login`, userData)
          const token = response.data.token;
            localStorage.setItem("token", token);
            console.log(token);
        } catch (error){
            console.error("Error al cargar usuario:", error);
        }
    }

    return (
        <div className="container">
        <Link to={"/"} className="btn btn-primary">Back</Link>
        <div className="w-50 mx-auto border p-5 shadow bg-body-secondary border-light-secondary rounded-lg">
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address: </label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           onChange={(e) => setEmail(e.target.value)}
                           
                           required
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password: </label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           onChange={(e) => setPassword(e.target.value)}
                            required
                    />
                </div>
                <Button type="submit" className="btn-primary" text="Submit"></Button>
            </form>
        </div>
    </div>)
    

}

export default LoginUser;