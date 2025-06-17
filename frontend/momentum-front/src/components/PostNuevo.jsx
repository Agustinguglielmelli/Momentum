import React, { useEffect, useState, } from "react";
import {Link} from "react-router-dom";

import axios from "axios";
import Carousel from "./carousel/Carousel";

function PostNuevo({ post }) {
    const [likeCount, setLikeCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showComments, setShowComments] = useState(false);

    const postId = post.idRecPost;
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/likes/count/${postId}`, config)
            .then(res => setLikeCount(res.data))
            .catch(err => console.error("Error fetching like count:", err));

        axios.get(`http://localhost:8080/api/likes/has-liked/${postId}`, config)
            .then(res => setHasLiked(res.data))
            .catch(err => console.error("Error fetching like status:", err));

        axios.get(`http://localhost:8080/api/comments/post/${postId}/count`, config)
            .then(res => setCommentCount(res.data))
            .catch(err => console.error("Error fetching comment count:", err));
    }, [postId]);

    const toggleLike = () => {
        axios.post(`http://localhost:8080/api/likes/toggle/${postId}`, null, config)
            .then(() => {
                setHasLiked(!hasLiked);
                setLikeCount(prev => hasLiked ? prev - 1 : prev + 1);
            })
            .catch(err => console.error("Error toggling like:", err));
    };

    const fetchComments = () => {
        axios.get(`http://localhost:8080/api/comments/post/${postId}`, config)
            .then(res => setComments(res.data))
            .catch(err => console.error("Error fetching comments:", err));
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() === "") return;

        axios.post("http://localhost:8080/api/comments/", {
            postId,
            text: newComment
        }, config)
            .then(() => {
                setNewComment("");
                fetchComments();
                setCommentCount(prev => prev + 1);
            })
            .catch(err => console.error("Error posting comment:", err));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleCommentSubmit();
        }
    };

    return (
        <div className="post">
            {post.usuario && (
                <div className="post-header">
                    <img
                        className="post-user-avatar"
                        src={post.usuario.profilePicture}
                        alt="Profile picture"
                    />
                    <div className="post-user-info">
                        <div className="post-username">{post.usuario.displayUserName}</div>
                        <div className="post-time">{post.fechaPublicacion}</div>
                    </div>
                </div>
            )}
            <div className="post-content">
                <Carousel imageList={post.images} />
                <div className="post-text">Calories burnt: {post.calories}</div>
                <div className="post-text">Distance run: {post.distance} kms</div>
                <div className="post-text">Duration: {post.duration} minutes</div>
                <div className="post-text">{post.description}</div>
            </div>
            <div className="post-stats">
                <div>{likeCount} {likeCount === 1 ? "Me gusta" : "Me gustan"}</div>
                <div>{commentCount} {commentCount === 1 ? "Comentario" : "Comentarios"}</div>
            </div>
            <div className="post-footer">
                <div
                    className={`post-action ${hasLiked ? 'liked' : ''}`}
                    onClick={toggleLike}
                >
                    {hasLiked ? "👍 Ya te gusta" : "👍 Me gusta"}
                </div>
                <div
                    className="post-action"
                    onClick={() => {
                        setShowComments(!showComments);
                        if (!showComments) fetchComments();
                    }}
                >
                    💬 {showComments ? "Ocultar comentarios" : "Ver comentarios"}
                </div>
                <div className="post-action">↗️ Compartir</div>
            </div>

            {showComments && (
                <div className="comments-section">
                    <div className="comment-form">
                        <textarea
                            className="comment-input"
                            placeholder="Escribe un comentario..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyPress={handleKeyPress}
                            maxLength={300}
                            rows="3"
                        />
                        <div className="comment-form-footer">
                            <div className="character-count">
                                {newComment.length}/300
                            </div>
                            <button
                                className="comment-submit"
                                onClick={handleCommentSubmit}
                                disabled={newComment.trim() === "" || newComment.length > 500}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>

                    <div className="comments-list" style={{
                        maxHeight: "270px",  // aprox. 3 comentarios
                        overflowY: "auto",
                        paddingRight: "4px"
                    }}>
                        {comments.length === 0 ? (
                            <div className="no-comments">
                                No hay comentarios aún. ¡Sé el primero en comentar!
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} className="comment" style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    marginBottom: "16px",
                                    padding: "12px",
                                    backgroundColor: "#f8f9fa",
                                    borderRadius: "12px",
                                    border: "1px solid #e9ecef",
                                    gap: "12px"
                                }}>
                                    <img
                                        className="comment-avatar"
                                        src={comment.author.profilePicture || '/default-avatar.png'}
                                        alt={`${comment.author.displayUserName} avatar`}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            flexShrink: 0,
                                            border: '2px solid #dee2e6'
                                        }}
                                    />
                                    <div className="comment-content" style={{
                                        flex: 1,
                                        minWidth: 0
                                    }}>
                                        <div className="comment-header" style={{
                                            marginBottom: "6px"
                                        }}>
                                            <span className="comment-author" style={{
                                                fontWeight: "600",
                                                fontSize: "14px",
                                                color: "#495057"
                                            }}>
                                            <Link to={`/myProfile/${comment.author.id}`}>
                                              {comment.author.displayUserName}
                                            </Link>
                                            </span>
                                        </div>
                                        <div className="comment-message" style={{
                                            backgroundColor: "#ffffff",
                                            padding: "10px 14px",
                                            borderRadius: "18px",
                                            border: "1px solid #e9ecef",
                                            fontSize: "14px",
                                            lineHeight: "1.4",
                                            color: "#212529",
                                            wordWrap: "break-word",
                                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                                        }}>
                                            {comment.text}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostNuevo;