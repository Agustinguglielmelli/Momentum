import React, { useState, useEffect } from "react";
import axios from "axios";
import { convertToBase64 } from "../../../api/functions";
import { Link, useNavigate } from "react-router-dom";
import { FaRegComment, FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";
import "./RecPostFormWithInteractions2.css";

// Funciones para interactuar con el backend
const getPostWithInteractions = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/miperfil/recPost/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching post with interactions:", error);
        throw error;
    }
};

const toggleLike = async (postId) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/likes/toggle/${postId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error toggling like:", error);
        throw error;
    }
};

const addComment = async (postId, text) => {
    try {
        const response = await axios.post(`http://localhost:8080/comments`, {
            text: text,
            postId: postId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};

function RecPostFormWithInteractions2({ id }) {
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Cargar datos del post si existe un ID
    useEffect(() => {
        if (id) {
            const loadPostData = async () => {
                try {
                    const postData = await getPostWithInteractions(id);
                    setCalories(postData.calories || '');
                    setDistance(postData.distance || '');
                    setDuration(postData.duration || '');
                    setDescription(postData.description || '');
                    setLikes(postData.likes || 0);
                    setIsLiked(postData.isLiked || false);
                    setComments(postData.comments || []);
                    // Aquí deberías manejar las imágenes también
                } catch (error) {
                    console.error("Error loading post data:", error);
                }
            };
            loadPostData();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = {
            calories: calories,
            distance: distance,
            duration: duration,
            description: description,
            images: base64.map(img => ({ base64Data: img })),
        };

        try {
            // Aquí deberías implementar la llamada real al backend para crear/editar el post
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Post data:', data);
            alert(id ? 'Post updated successfully!' : 'Post created successfully!');
            navigate('/miperfil');
        } catch (error) {
            console.error("Error saving post:", error);
            alert('Error saving post');
        } finally {
            setIsSubmitting(false);
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
            if (!id) return;

            await toggleLike(id);
            setIsLiked(!isLiked);
            setLikes(isLiked ? likes - 1 : likes + 1);
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !id) return;

        try {
            const addedComment = await addComment(id, newComment);
            setComments([...comments, addedComment]);
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="container">
            <div className="post-container">
                {/* Header */}
                <div className="header">
                    <h1 className="title">
                        {id ? "Edit Post" : "Create New Post"}
                    </h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="form">
                    {/* Image Upload Section */}
                    <div style={{ marginBottom: '24px' }}>
                        <label className="section-label">
                            Photos
                        </label>

                        {base64.length === 0 ? (
                            <label className="upload-area">
                                <div className="upload-icon">📸</div>
                                <div className="upload-text">
                                    Drag photos here
                                </div>
                                <div className="upload-subtext">
                                    or click to select
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleMultipleImages}
                                    multiple
                                    style={{ display: 'none' }}
                                />
                            </label>
                        ) : (
                            <div>
                                <div className="image-grid">
                                    {base64.map((img, index) => (
                                        <div key={index} className="image-preview">
                                            <img
                                                src={img}
                                                alt={`preview-${index}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="remove-image-button"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <label className="add-more-button">
                                    Add More Photos
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleMultipleImages}
                                        multiple
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Stats Input Grid */}
                    <div className="stats-grid">
                        <div>
                            <label className="input-label">
                                Distance (km)
                            </label>
                            <input
                                type="number"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                className="input-field"
                                placeholder="0.0"
                                required
                            />
                        </div>
                        <div>
                            <label className="input-label">
                                Duration (min)
                            </label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="input-field"
                                placeholder="0"
                                required
                            />
                        </div>
                        <div>
                            <label className="input-label">
                                Calories
                            </label>
                            <input
                                type="number"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                className="input-field"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div style={{ marginBottom: '24px' }}>
                        <label className="input-label">
                            Caption
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={2200}
                            placeholder="Write a caption..."
                            className="textarea"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : (id ? 'Update Post' : 'Share Post')}
                    </button>

                    {/* Interactions (solo para posts existentes) */}
                    {id && (
                        <>
                            <div className="interactions">
                                <button
                                    type="button"
                                    className="interaction-button"
                                    onClick={handleLike}
                                >
                                    {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                                    <span>{likes}</span>
                                </button>
                                <button
                                    type="button"
                                    className="interaction-button"
                                    onClick={() => setShowComments(!showComments)}
                                >
                                    <FaRegComment />
                                    <span>{comments.length}</span>
                                </button>
                            </div>

                            {showComments && (
                                <div className="comments-section">
                                    <div className="comment-list">
                                        {comments.map((comment, index) => (
                                            <div key={index} className="comment-item">
                                                <span className="comment-author">{comment.author.username}:</span>
                                                <span>{comment.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <form onSubmit={handleAddComment} className="comment-form">
                                        <input
                                            type="text"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Add a comment..."
                                            className="comment-input"
                                        />
                                        <button type="submit" className="comment-submit">Post</button>
                                    </form>
                                </div>
                            )}
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}

export default RecPostFormWithInteractions2;