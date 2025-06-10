import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "./carousel/Carousel";

function PostNuevo({ post }) {
    const [likeCount, setLikeCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [commentCount, setCommentCount] = useState(0);

    const postId = post.id;

    useEffect(() => {
        // Traer cantidad de likes
        axios.get(`/api/likes/count/${postId}`)
            .then(res => setLikeCount(res.data))
            .catch(err => console.error("Error fetching like count:", err));

        // Traer si el usuario actual ha dado like
        axios.get(`/api/likes/has-liked/${postId}`)
            .then(res => setHasLiked(res.data))
            .catch(err => console.error("Error fetching like status:", err));

        // (Opcional) Traer cantidad de comentarios
        axios.get(`/api/comments/count/${postId}`)
            .then(res => setCommentCount(res.data))
            .catch(err => console.error("Error fetching comment count:", err));
    }, [postId]);

    const toggleLike = () => {
        axios.post(`/api/likes/toggle/${postId}`)
            .then(() => {
                setHasLiked(!hasLiked);
                setLikeCount(prev => hasLiked ? prev - 1 : prev + 1);
            })
            .catch(err => console.error("Error toggling like:", err));
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
                <div className="post-action">💬 Comentar</div>
                <div className="post-action">↗️ Compartir</div>
            </div>
        </div>
    );
}

export default PostNuevo;
