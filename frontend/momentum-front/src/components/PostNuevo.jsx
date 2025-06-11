import React, { useEffect, useState } from "react";
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
            text: newComment   // <-- aquí cambiar a 'text'
        }, config)
            .then(() => {
                setNewComment("");
                fetchComments();
                setCommentCount(prev => prev + 1);
            })
            .catch(err => console.error("Error posting comment:", err));
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
                    className="post-action"
                    style={{ cursor: "pointer", color: hasLiked ? "blue" : "black" }}
                    onClick={toggleLike}
                >
                    {hasLiked ? "👍 Ya te gusta" : "👍 Me gusta"}
                </div>
                <div
                    className="post-action"
                    style={{ cursor: "pointer" }}
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
                <div className="post-comments" style={{ marginTop: "10px" }}>
                    <div className="post-comments-list">
                        {comments.length === 0 ? (
                            <div style={{ fontStyle: "italic", color: "gray" }}>
                                No hay comentarios aún.
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} className="comment-item" style={{ padding: "4px 0", borderBottom: "1px solid #eee" }}>
                                    <strong>{comment.author.displayUserName}</strong>: {comment.text}
                                </div>
                            ))
                        )}
                    </div>
                    <div className="post-comments-form" style={{ marginTop: "10px" }}>
                        <input
                            type="text"
                            placeholder="Escribe un comentario..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            style={{ width: "80%", marginRight: "5px" }}
                        />
                        <button onClick={handleCommentSubmit}>Enviar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostNuevo;
