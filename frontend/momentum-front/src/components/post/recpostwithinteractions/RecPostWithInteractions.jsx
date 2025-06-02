import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { toggleLike, addComment, getPostWithInteractions } from "../../../api/functions";
import Carousel from "../../carousel/Carousel";
import "./PostWithInteractions.css";

function RecPostWithInteractions({ postId, initialData, onDelete }) {
    // Estados mejorados con valores iniciales más seguros
    const [post, setPost] = useState(initialData || {
        usuario: {},
        images: [],
        comments: []
    });
    const [isLiked, setIsLiked] = useState(initialData?.userLiked || false);
    const [likeCount, setLikeCount] = useState(initialData?.likeCount || 0);
    const [comments, setComments] = useState(initialData?.comments || []);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(!initialData && !!postId);
    const [error, setError] = useState(null);

    // Carga de datos mejorada
    useEffect(() => {
        const loadPostData = async () => {
            if (!postId && !initialData) {
                setError("No post data provided");
                return;
            }

            if (initialData) {
                // Datos ya proporcionados, no necesitamos cargar
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                const postData = await getPostWithInteractions(postId);
                setPost(postData);
                setIsLiked(postData.userLiked || false);
                setLikeCount(postData.likeCount || 0);
                setComments(postData.comments || []);
            } catch (err) {
                console.error("Error loading post:", err);
                setError("Failed to load post data");
            } finally {
                setIsLoading(false);
            }
        };

        loadPostData();
    }, [postId, initialData]);

    const handleLike = async () => {
        try {
            await toggleLike(post.idRecPost);
            setIsLiked(!isLiked);
            setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
        } catch (err) {
            console.error("Error toggling like:", err);
            setError("Failed to update like");
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            setError(null);
            const comment = await addComment(post.idRecPost, newComment);
            setComments(prev => [...prev, comment]);
            setNewComment('');
        } catch (err) {
            console.error("Error adding comment:", err);
            setError("Failed to add comment");
        }
    };

    if (isLoading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!post?.idRecPost) {
        return <div className="error-message">Post not available</div>;
    }

    return (
        <div className="post-container">
            {/* Encabezado del post */}
            <div className="post-header">
                <img
                    src={post.usuario?.profilePicture || '/default-profile.png'}
                    alt="Profile"
                    className="post-avatar"
                    onError={(e) => {
                        e.target.src = '/default-profile.png';
                    }}
                />
                <div className="post-user-info">
                    <span className="post-username">{post.usuario?.displayUserName || 'Unknown user'}</span>
                    {post.creationDate && (
                        <span className="post-date">
                            {new Date(post.creationDate).toLocaleDateString()}
                        </span>
                    )}
                </div>
                {onDelete && (
                    <button onClick={onDelete} className="delete-post-btn">
                        Delete
                    </button>
                )}
            </div>

            {/* Contenido del post */}
            <div className="post-content">
                <Carousel imageList={post.images || []} />

                <div className="post-stats">
                    {post.distance && <span>{post.distance} km</span>}
                    {post.duration && <span>{post.duration} min</span>}
                    {post.calories && <span>{post.calories} cal</span>}
                </div>

                {post.description && <p className="post-description">{post.description}</p>}
            </div>

            {/* Interacciones */}
            <div className="post-interactions">
                <div className="interaction-stats">
                    <span>{likeCount} Likes</span>
                    <span>{comments.length} Comments</span>
                </div>

                <div className="interaction-buttons">
                    <button
                        className={`interaction-btn ${isLiked ? 'liked' : ''}`}
                        onClick={handleLike}
                        aria-label={isLiked ? 'Unlike post' : 'Like post'}
                    >
                        {isLiked ? <FaHeart color="red"/> : <FaRegHeart/>} Like
                    </button>

                    <button
                        className="interaction-btn"
                        onClick={() => setShowComments(!showComments)}
                        aria-label="Toggle comments"
                    >
                        <FaRegComment/> Comment
                    </button>
                </div>

                {showComments && (
                    <div className="comments-section">
                        <div className="comments-list">
                            {comments.length > 0 ? (
                                comments.map((comment, index) => (
                                    <div key={`${comment.id || index}`} className="comment">
                                        <img
                                            src={comment.author?.profilePicture || '/default-profile.png'}
                                            alt="Commenter"
                                            className="comment-avatar"
                                            onError={(e) => {
                                                e.target.src = '/default-profile.png';
                                            }}
                                        />
                                        <div className="comment-content">
                                            <span className="comment-author">
                                                {comment.author?.displayUserName || 'Unknown user'}
                                            </span>
                                            <p className="comment-text">{comment.text}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-comments">No comments yet</p>
                            )}
                        </div>

                        <form onSubmit={handleAddComment} className="comment-form">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="comment-input"
                                required
                                aria-label="Comment input"
                            />
                            <button type="submit" className="comment-submit" disabled={!newComment.trim()}>
                                Post
                            </button>
                        </form>
                        {error && <p className="comment-error">{error}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}

RecPostWithInteractions.propTypes = {
    postId: PropTypes.number,
    initialData: PropTypes.shape({
        idRecPost: PropTypes.number,
        usuario: PropTypes.object,
        images: PropTypes.array,
        description: PropTypes.string,
        distance: PropTypes.number,
        duration: PropTypes.string,
        calories: PropTypes.string,
        creationDate: PropTypes.string,
        userLiked: PropTypes.bool,
        likeCount: PropTypes.number,
        comments: PropTypes.array
    }),
    onDelete: PropTypes.func
};

export default RecPostWithInteractions;