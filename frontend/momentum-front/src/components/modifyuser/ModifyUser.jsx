import ButtonNuestro from "../button/ButtonNuestro";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";

function ModifyUser () {
    const navigate = useNavigate();

    const [username, setusername] = useState("");
    const [base64, setBase64] = useState('');
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { //con esta funcion nos traemos los datos del usuario
        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:8080/myUsuario`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                const data = response.data;
                setusername(data.username || "");
                setEmail(data.email || "");
                setBase64(data.profilePicture || "");
                console.log(data)

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        fetchUserData();
    }, []);

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

    const removeImage = () => {
        setBase64('');
    };

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        const userData = {
            username,
            email,
            profilePicture: base64
        };

        try {
            const response = await axios.put(`http://localhost:8080/usuario/modify`, userData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            if (response.data.token){
                localStorage.setItem("token", response.data.token);
            }
            console.log("Usuario actualizado:", response.data);
            navigate("/myProfile");
        } catch (error) {
            console.error("Error al cargar usuario:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="form-container-modern">
            {/* Header del formulario */}
            <div className="form-header-modern">
                <Link to='/' className="back-btn-modern">
                    <span>←</span>
                    Back
                </Link>
                <h1 className="form-title-modern">Update Profile</h1>
                <p className="form-subtitle-modern">Edit your personal information and profile picture</p>
            </div>

            {/* Card principal del formulario */}
            <div className="form-card-modern">
                <form className="modern-form" onSubmit={handleSubmit}>
                    {/* Sección de información personal */}
                    <div className="form-section-modern">
                        <h2 className="section-title-form">
                            <span>👤</span>
                            Personal Information
                        </h2>

                        <div className="input-group-modern">
                            <label htmlFor="username" className="input-label-modern">Username</label>
                            <div className="input-wrapper-modern">
                                <input
                                    type="text"
                                    className="input-modern"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setusername(e.target.value)}
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        <div className="input-group-modern">
                            <label htmlFor="email" className="input-label-modern">Email Address</label>
                            <div className="input-wrapper-modern">
                                <input
                                    type="email"
                                    className="input-modern"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección de foto de perfil */}
                    <div className="form-section-modern">
                        <h2 className="section-title-form">
                            <span>📷</span>
                            Profile Picture
                        </h2>

                        <div className="image-upload-area-modern">
                            <input
                                type="file"
                                id="profilePicture"
                                name="profilePicture"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="file-input-hidden"
                            />

                            {!base64 ? (
                                <label htmlFor="profilePicture" className="file-upload-btn-modern">
                                    <div className="upload-icon">📸</div>
                                    <span className="upload-text">Click to upload photo</span>
                                    <span className="upload-subtext">PNG, JPG or GIF (max. 5MB)</span>
                                </label>
                            ) : (
                                <div className="image-preview-grid-modern">
                                    <div className="image-preview-card-modern">
                                        <img
                                            src={base64}
                                            alt="Profile preview"
                                            className="preview-image-modern"
                                        />
                                        <button
                                            type="button"
                                            className="remove-image-btn-modern"
                                            onClick={removeImage}
                                            title="Remove image"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Acciones del formulario */}
                    <div className="form-actions-modern">
                        <Link to="/myProfile" className="btn-cancel-modern">
                            <span>✕</span>
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="btn-submit-modern"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="loading-spinner"></div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <span>✓</span>
                                    Update Profile
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModifyUser;