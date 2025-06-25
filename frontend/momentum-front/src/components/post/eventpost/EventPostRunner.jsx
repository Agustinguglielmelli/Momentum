import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export function EventPostRunner({ post, actionType, handleAction }) {
    const [expanded, setExpanded] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showComments, setShowComments] = useState(false);

    const eventId = post.idEvent;
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        // Fetch likes data
        axios.get(`http://localhost:8080/api/likes/event/count/${eventId}`, config)
            .then(res => setLikeCount(res.data))
            .catch(err => console.error("Error fetching event like count:", err));

        axios.get(`http://localhost:8080/api/likes/event/has-liked/${eventId}`, config)
            .then(res => setHasLiked(res.data))
            .catch(err => console.error("Error fetching event like status:", err));

        axios.get(`http://localhost:8080/api/comments/event/${eventId}/count`, config)
             .then(res => setCommentCount(res.data))
             .catch(err => console.error("Error fetching comment count:", err));

    }, [eventId]);

    const toggleExpanded = () => {
        setExpanded(prev => !prev);
    };

    const toggleLike = () => {
        axios.post(`http://localhost:8080/api/likes/event/toggle/${eventId}`, null, config)
            .then(() => {
                setHasLiked(!hasLiked);
                setLikeCount(prev => hasLiked ? prev - 1 : prev + 1);
            })
            .catch(err => console.error("Error toggling event like:", err));
    };

    const handleActionClick = async () => {
        try {
            if (handleAction) {
                await handleAction(post.idEvent);
            }
        } catch (error) {
            console.error('Error al salir o unirse al evento', error);
        }
    };

    const fetchComments = () => {
        axios.get(`http://localhost:8080/api/comments/event/${eventId}`, config)
            .then(res => setComments(res.data))
            .catch(err => console.error("Error fetching comments:", err));

    };

    const handleCommentSubmit = () => {
        if (newComment.trim() === "") return;

         axios.post("http://localhost:8080/api/comments/event", {
             eventId,
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
        <div className="event-card">
            <div className="event-header">
                <div className="event-type-badge">
                    🏃‍♂️ RUNNING EVENT
                </div>
                <div className="event-creator">
                    {post.creador && (
                        <>
                            <img
                                className="creator-avatar"
                                src={post.creador.profilePicture || '/default-avatar.png'}
                                alt="Creator"
                            />
                            <span className="creator-name">{post.creador.displayUserName}</span>
                        </>
                    )}
                </div>
            </div>

            <div className="event-content">
                <h3 className="event-title">{post?.title}</h3>

                <div className="event-details-grid">
                    <div className="detail-item">
                        <span className="detail-icon">📍</span>
                        <div>
                            <div className="detail-label">Inicio</div>
                            <div className="detail-value">{post?.startAtPlace}</div>
                        </div>
                    </div>

                    <div className="detail-item">
                        <span className="detail-icon">🏁</span>
                        <div>
                            <div className="detail-label">Final</div>
                            <div className="detail-value">{post?.endAtPlace}</div>
                        </div>
                    </div>

                    <div className="detail-item">
                        <span className="detail-icon">📏</span>
                        <div>
                            <div className="detail-label">Distancia</div>
                            <div className="detail-value">{post?.kmToRun} km</div>
                        </div>
                    </div>

                    <div className="detail-item">
                        <span className="detail-icon">📅</span>
                        <div>
                            <div className="detail-label">Fecha</div>
                            <div className="detail-value">{post?.date}</div>
                        </div>
                    </div>
                </div>

                {expanded && (
                    <div className="event-description">
                        <h4>Descripción del evento</h4>
                        <p>{post?.description}</p>
                    </div>
                )}
            </div>

            {/* Stats Section */}
            <div className="event-stats">
                <div className="stat-item">
                    <span className="stat-icon">❤️</span>
                    <span>{likeCount} {likeCount === 1 ? "like" : "likes"}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-icon">💬</span>
                    <span>{commentCount} {commentCount === 1 ? "comentario" : "comentarios"}</span>
                </div>
            </div>

            {/* Actions Section */}
            <div className="event-actions">
                <button
                    className={`action-btn ${hasLiked ? 'liked' : ''}`}
                    onClick={toggleLike}
                >
                    <span className="action-icon">{hasLiked ? "❤️" : "🤍"}</span>
                    {hasLiked ? "Te gusta" : "Me gusta"}
                </button>

                <button
                    className="action-btn"
                    onClick={() => {
                        setShowComments(!showComments);
                        if (!showComments) fetchComments();
                    }}
                >
                    <span className="action-icon">💬</span>
                    {showComments ? "Ocultar comentarios" : "Comentarios"}
                </button>

                <button
                    className="action-btn"
                    onClick={toggleExpanded}
                >
                    <span className="action-icon">📋</span>
                    {expanded ? 'Menos info' : 'Más info'}
                </button>

                {handleAction && (
                    <button
                        onClick={handleActionClick}
                        className={`action-btn ${actionType === "unjoin" ? 'danger' : 'primary'}`}
                    >
                        <span className="action-icon">{actionType === "unjoin" ? '🚪' : '🏃‍♂️'}</span>
                        {actionType === "unjoin" ? 'Salir del evento' : 'Unirse al evento'}
                    </button>
                )}
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="event-comments">
                    <div className="comment-form">
                        <div className="comment-input-wrapper">
                            <textarea
                                className="comment-input"
                                placeholder="Comparte tu opinión sobre este evento..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyPress={handleKeyPress}
                                maxLength={300}
                                rows="2"
                            />
                            <div className="comment-actions">
                                <span className="char-count">{newComment.length}/300</span>
                                <button
                                    className="comment-submit-btn"
                                    onClick={handleCommentSubmit}
                                    disabled={newComment.trim() === ""}
                                >
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="comments-list">
                        {comments.length === 0 ? (
                            <div className="no-comments">
                                <span className="no-comments-icon">💭</span>
                                <p>No hay comentarios aún. ¡Sé el primero en comentar sobre este evento!</p>
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} className="event-comment">
                                    <img
                                        className="comment-user-avatar"
                                        src={comment.author.profilePicture || '/default-avatar.png'}
                                        alt={`${comment.author.displayUserName} avatar`}
                                    />
                                    <div className="comment-bubble">
                                        <Link className="comment-author" to={`/myProfile/${comment.author.id}`}>
                                            {comment.author.displayUserName}
                                        </Link>
                                        <div className="comment-text">
                                            {comment.text}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
                .event-card {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 16px;
                    margin-bottom: 24px;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    color: white;
                }

                .event-header {
                    padding: 16px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                }

                .event-type-badge {
                    background: rgba(255, 255, 255, 0.2);
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }

                .event-creator {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .creator-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                }

                .creator-name {
                    font-weight: 500;
                    font-size: 14px;
                }

                .event-content {
                    padding: 20px;
                }

                .event-title {
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                .event-details-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    margin-bottom: 20px;
                }

                .detail-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: rgba(255, 255, 255, 0.1);
                    padding: 12px;
                    border-radius: 12px;
                    backdrop-filter: blur(5px);
                }

                .detail-icon {
                    font-size: 20px;
                }

                .detail-label {
                    font-size: 12px;
                    opacity: 0.8;
                    margin-bottom: 2px;
                }

                .detail-value {
                    font-weight: 600;
                    font-size: 14px;
                }

                .event-description {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 16px;
                    border-radius: 12px;
                    margin-top: 16px;
                }

                .event-description h4 {
                    margin-bottom: 8px;
                    font-size: 16px;
                }

                .event-stats {
                    display: flex;
                    gap: 24px;
                    padding: 16px 20px;
                    background: rgba(0, 0, 0, 0.1);
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 14px;
                    font-weight: 500;
                }

                .stat-icon {
                    font-size: 16px;
                }

                .event-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    padding: 16px 20px;
                    background: rgba(0, 0, 0, 0.05);
                }

                .action-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 16px;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    backdrop-filter: blur(5px);
                }

                .action-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-1px);
                }

                .action-btn.liked {
                    background: rgba(255, 105, 135, 0.3);
                    border-color: rgba(255, 105, 135, 0.5);
                }

                .action-btn.primary {
                    background: rgba(46, 213, 115, 0.3);
                    border-color: rgba(46, 213, 115, 0.5);
                }

                .action-btn.danger {
                    background: rgba(255, 107, 107, 0.3);
                    border-color: rgba(255, 107, 107, 0.5);
                }

                .action-icon {
                    font-size: 16px;
                }

                .event-comments {
                    background: rgba(255, 255, 255, 0.95);
                    color: #333;
                    padding: 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                }

                .comment-form {
                    margin-bottom: 20px;
                }

                .comment-input-wrapper {
                    background: white;
                    border-radius: 12px;
                    padding: 12px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .comment-input {
                    width: 100%;
                    border: none;
                    outline: none;
                    resize: vertical;
                    font-size: 14px;
                    line-height: 1.4;
                    margin-bottom: 8px;
                }

                .comment-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .char-count {
                    font-size: 12px;
                    color: #666;
                }

                .comment-submit-btn {
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 6px 16px;
                    border-radius: 16px;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }

                .comment-submit-btn:hover:not(:disabled) {
                    background: #5a6fd8;
                }

                .comment-submit-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .comments-list {
                    max-height: 300px;
                    overflow-y: auto;
                }

                .no-comments {
                    text-align: center;
                    padding: 32px;
                    color: #666;
                }

                .no-comments-icon {
                    font-size: 32px;
                    display: block;
                    margin-bottom: 8px;
                }

                .event-comment {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 16px;
                    align-items: flex-start;
                }

                .comment-user-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                .comment-bubble {
                    background: #f8f9fa;
                    border-radius: 16px;
                    padding: 12px 16px;
                    flex: 1;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }

                .comment-author {
                    font-weight: 600;
                    font-size: 13px;
                    color: #667eea;
                    margin-bottom: 4px;
                }

                .comment-text {
                    font-size: 14px;
                    line-height: 1.4;
                    color: #333;
                }

                @media (max-width: 768px) {
                    .event-details-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .event-actions {
                        flex-direction: column;
                    }
                    
                    .action-btn {
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    );
}