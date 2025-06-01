
import { useState } from 'react';
import { FaRegComment } from "react-icons/fa";
import Carousel from "./carousel/Carousel";

function PostNuevo({ post, currentUser }) {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(post.commentCount || 0);

    const toggleComments = () => {
        if (!showComments && comments.length === 0) {
            // Cargar comentarios solo cuando se abren por primera vez
            fetchComments();
        }
        setShowComments(!showComments);
    };

    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/comments/post/${post.idRecPost}`);
            if (!response.ok) throw new Error('Error al cargar comentarios');
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            // Optimistic UI update
            const tempId = Date.now(); // ID temporal
            const optimisticComment = {
                id: tempId,
                text: newComment,
                author: {
                    id: currentUser.id,
                    username: currentUser.username,
                    profilePicture: currentUser.profilePicture,
                    displayUserName: currentUser.displayUserName
                },
                createdAt: new Date().toISOString(),
                postId: post.idRecPost
            };

            setComments([...comments, optimisticComment]);
            setCommentCount(commentCount + 1);
            setNewComment('');

            // Enviar al backend
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    text: newComment,
                    postId: post.idRecPost
                })
            });

            if (!response.ok) throw new Error('Error al publicar comentario');

            const realComment = await response.json();

            // Reemplazar el comentario temporal con el real
            setComments(comments.map(comment =>
                comment.id === tempId ? realComment : comment
            ));
        } catch (error) {
            console.error("Error:", error);
            // Revertir cambios si falla
            setComments(comments.filter(c => c.id !== tempId));
            setCommentCount(commentCount - 1);
        }
    };

    return (
        <div className="post">
            {/* Encabezado del post */}
            {post.usuario && (
                <div className="post-header">
                    <img className="post-user-avatar" src={post.usuario.profilePicture} alt="Profile picture"/>
                    <div className="post-user-info">
                        <div className="post-username">{post.usuario.displayUserName}</div>
                        <div className="post-time">{post.creationDate}</div>
                    </div>
                </div>
            )}

            {/* Contenido del post */}
            <div className="post-content">
                <div className="post-text">{post.description}</div>
                <Carousel imageList={post.images || []}/>
            </div>

            {/* Estadísticas */}
            <div className="post-stats">
                <div>{post.likes || 0} Me gusta</div>
                <div>{commentCount} Comentarios</div>
            </div>

            {/* Acciones */}
            <div className="post-actions">
                <button className="post-action">👍 Me gusta</button>
                <button
                    className="post-action comment-action"
                    onClick={toggleComments}
                >
                    <FaRegComment className="comment-icon" /> Comentar
                </button>
                <button className="post-action">↗️ Compartir</button>
            </div>

            {/* Sección de comentarios (aparece al hacer clic) */}
            {showComments && (
                <div className="comments-section">
                    <div className="comments-list">
                        {comments.map(comment => (
                            <div key={comment.id} className="comment">
                                <img
                                    src={comment.author.profilePicture}
                                    alt={comment.author.displayUserName}
                                    className="comment-avatar"
                                />
                                <div className="comment-content">
                                    <span className="comment-username">
                                        {comment.author.displayUserName}
                                    </span>
                                    <span className="comment-text">{comment.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Formulario para nuevo comentario */}
                    <form onSubmit={handleSubmitComment} className="comment-form">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Añade un comentario..."
                            className="comment-input"
                        />
                        <button
                            type="submit"
                            className="comment-submit"
                            disabled={!newComment.trim()}
                        >
                            Publicar
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default PostNuevo;