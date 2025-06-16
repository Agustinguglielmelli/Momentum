//import "./RecreationalPostForm.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { convertToBase64, getUserId } from "../../../api/functions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRegComment, FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";

function RecPostFormWithInteractions() {
    const { postId } = useParams(); // extrae el ID de la URL

    const [calories, setCalories] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [base64, setBase64] = useState([]);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    const navigate = useNavigate();

    // Cargar datos iniciales del post si es edición
    useEffect(() => {
        if (postId) {
            const fetchPostData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/miperfil/recPost/${postId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    const post = response.data;
                    setDistance(post.distance);
                    setDuration(post.duration);
                    setCalories(post.calories);
                    setDescription(post.description);
                    setLikes(post.likes || 0);
                    setComments(post.comments || []);

                    // Verificar si el usuario actual dio like
                    const likeCheck = await axios.get(`http://localhost:8080/api/likes/has-liked/${postId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    setIsLiked(likeCheck.data);
                } catch (error) {
                    console.error("Error al cargar el post:", error);
                }
            };
            fetchPostData();
        }
    }, [postId]);

    // para guardar el plan
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            calories: calories,
            distance: distance,
            duration: duration,
            description: description,
            images: base64.map(img => ({ base64Data: img })),
        };

        try {
            if (postId) {
                // Editar post existente
                await axios.put(`http://localhost:8080/miperfil/recPost/${postId}`, data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            } else {
                // Crear nuevo post
                await axios.post("http://localhost:8080/miperfil/recPost", data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            }
            navigate("/home");
        } catch (error) {
            console.error("Error al guardar el post:", error);
        }
    };

    const handleMultipleImages = async (event) => {
        const files = Array.from(event.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        try {
            if ((base64.length + imageFiles.length) > 5) {
                alert("Solo se permiten hasta 5 imágenes.");
                return;
            }
            const base64Images = await Promise.all(
                imageFiles.map(file => convertToBase64(file))
            );
            setBase64(prev => [...prev, ...base64Images]);
        } catch (error) {
            console.error("Error al convertir imágenes:", error);
        }
    };

    const removeImage = (index) => {
        setBase64(prev => prev.filter((_, i) => i !== index));
    };

    const handleLike = async () => {
        try {
            await axios.post(`http://localhost:8080/api/likes/toggle/${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setIsLiked(!isLiked);
            setLikes(isLiked ? likes - 1 : likes + 1);
        } catch (error) {
            console.error("Error al dar like:", error);
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await axios.post(
                "http://localhost:8080/api/comments",
                {
                    text: newComment,
                    postId: postId
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error("Error al agregar comentario:", error);
        }
    };

    return (
        <div>
            <Link to={"/myProfile"} className="btn btn-primary">Back</Link>
            <div className="w-50 mx-auto border p-5 shadow bg-body-secondary border-light-secondary rounded-lg">
                <h1>{postId ? "Edit Post" : "Create Post"}</h1>
                <form onSubmit={handleSubmit}>
                    {/* Campos del formulario existentes */}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Distance (kms): </label>
                        <input
                            type="number"
                            maxLength={5}
                            className="form-control"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="frequency" className="form-label">Duration (minutes): </label>
                        <input
                            type="number"
                            maxLength={10}
                            className="form-control"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Calories: </label>
                        <input
                            type="number"
                            maxLength={5}
                            className="form-control"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Images: </label>
                        <input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            accept="image/*"
                            onChange={handleMultipleImages}
                            multiple
                        />
                        {base64.length > 0 && (
                            <div className="image-preview-container">
                                {base64.map((img, index) => (
                                    <div key={index} className="image-preview-wrapper">
                                        <img
                                            src={img}
                                            alt={`preview-${index}`}
                                            className="image-preview"
                                        />
                                        <button
                                            type="button"
                                            className="remove-image-btn"
                                            onClick={() => removeImage(index)}
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description: </label>
                        <textarea
                            type="text"
                            maxLength={150}
                            style={{ resize: "none" }}
                            rows="5"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>



                    <button type="submit" className="btn btn-primary">
                        {postId ? "Update Post" : "Create Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RecPostFormWithInteractions;