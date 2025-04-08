import Button from "../button/Button";
import axios from "axios";
import React, {useState} from "react";
import {Link} from "react-router-dom"; 

function LoginUser() {
    return (



        <div className="container">
        <Link to={"/"} className="btn btn-primary">Back</Link>
        <div className="w-50 mx-auto border p-5 shadow bg-body-secondary border-light-secondary rounded-lg">
            <h1>Log in</h1>
            <form >
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                       
                        // e.target.value es el contenido del input que se escribe
                        required // Hay que completar el campor para poder darle submit
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address: </label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                          
                           
                           required
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password: </label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           
                           
                            required
                    />
                </div>
                <Button type="submit" className="btn-primary" text="Submit"></Button>
            </form>
        </div>
    </div>)
    

}

export default LoginUser;