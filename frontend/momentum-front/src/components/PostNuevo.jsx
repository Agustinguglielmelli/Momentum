import Carousel from "./carousel/Carousel";
import React, { useState, useEffect } from 'react';
import './PostNuevoCSS.css';

function PostNuevo({ post, currentUser, onLike, onComment }) {
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);

    // Inicializar likes y comentarios del post
    useEffect(() => {
        if (post.likes) {
            setLikes(post.likes);
            // Verificar si el usuario actual ya dio like
            setIsLiked(post.likes.some(like => like.usuario?.id === currentUser?.id));
        }
        if (post.comments) {
            setComments(post.comments);
        }
    }, [post, currentUser]);

    // Manejar like/unlike
    const handleLike = async () => {
        if (!currentUser) {
            alert('Debes estar logueado para dar like');
            return;
        }

        setLoading(true);
        try {
            if (isLiked) {
                // Unlike - eliminar like
                const response = await fetch(`/api/likes/${post.idRecPost}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    setLikes(prev => prev.filter(like => like.usuario?.id !== currentUser.id));
                    setIsLiked(false);
                    if (onLike) onLike(post.idRecPost, false);
                }
            } else {
                // Like - agregar like
                const response = await fetch(`/api/likes`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        postId: post.idRecPost,
                        usuarioId: currentUser.id
                    })
                });

                if (response.ok) {
                    const newLike = await response.json();
                    setLikes(prev => [...prev, newLike]);
                    setIsLiked(true);
                    if (onLike) onLike(post.idRecPost, true);
                }
            }
        } catch (error) {
            console.error('Error al procesar like:', error);
            alert('Error al procesar like');
        } finally {
            setLoading(false);
        }
    };

    // Manejar nuevo comentario
    const handleComment = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert('Debes estar logueado para comentar');
            return;
        }

        if (!newComment.trim()) return;

        if (newComment.length > 1000) {
            alert('El comentario no puede superar los 1000 caracteres');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: newComment,
                    postId: post.idRecPost,
                    authorId: currentUser.id
                })
            });

            if (response.ok) {
                const comment = await response.json();
                setComments(prev => [...prev, comment]);
                setNewComment('');
                if (onComment) onComment(post.idRecPost, comment);
            }
        } catch (error) {
            console.error('Error al agregar comentario:', error);
            alert('Error al agregar comentario');
        } finally {
            setLoading(false);
        }
    };

    // Formatear fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Hace menos de una hora';
        if (diffInHours < 24) return `Hace ${diffInHours} horas`;
        if (diffInHours < 168) return `Hace ${Math.floor(diffInHours / 24)} días`;
        return date.toLocaleDateString();
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
                        <div className="post-time">{formatDate(post.fechaPublicacion)}</div>
                    </div>
                </div>
            )}

            <div className="post-content">
                <Carousel imageList={post.images}/>
                <div className="post-text">Calories burnt: {post.calories}</div>
                <div className="post-text">Distance run: {post.distance} kms</div>
                <div className="post-text">Duration: {post.duration} minutes</div>
                <div className="post-text">{post.description}</div>
            </div>

            <div className="post-stats">
                <div>{likes.length} Me gusta</div>
                <div>{comments.length} Comentarios</div>
            </div>

            <div className="post-footer">
                <button
                    className={`post-action ${isLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                    disabled={loading}
                >
                    {isLiked ? '❤️' : '👍'} {isLiked ? 'Me gusta' : 'Me gusta'}
                </button>

                <button
                    className="post-action"
                    onClick={() => setShowComments(!showComments)}
                >
                    💬 Comentar
                </button>

                <button className="post-action">
                    ↗️ Compartir
                </button>
            </div>

            {/* Sección de comentarios */}
            {showComments && (
                <div className="comments-section">
                    <form onSubmit={handleComment} className="comment-form">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Escribe un comentario..."
                            maxLength={1000}
                            rows={3}
                            className="comment-input"
                        />
                        <div className="comment-form-footer">
                            <span className="character-count">
                                {newComment.length}/1000
                            </span>
                            <button
                                type="submit"
                                disabled={!newComment.trim() || loading}
                                className="comment-submit"
                            >
                                {loading ? 'Enviando...' : 'Comentar'}
                            </button>
                        </div>
                    </form>

                    <div className="comments-list">
                        {comments.map(comment => (
                            <div key={comment.id} className="comment">
                                <img
                                    src={comment.author?.profilePicture}
                                    alt="Profile"
                                    className="comment-avatar"
                                />
                                <div className="comment-content">
                                    <div className="comment-header">
                                        <span className="comment-author">
                                            {comment.author?.displayUserName}
                                        </span>
                                        <span className="comment-time">
                                            {formatDate(comment.createdAt)}
                                        </span>
                                    </div>
                                    <div className="comment-text">{comment.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostNuevo;