import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { toggleLike, addComment, getPostWithInteractions } from "../../../api/functions";
import Carousel from "../../carousel/Carousel";
import "./PostWithInteractions.css";

function RecPostWithInteractions({ postId, initialData, onDelete }) {
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
    const [showOptions, setShowOptions] = useState(false);

    // Cargar datos del post si no se proporcionan datos iniciales
    useEffect(() => {
        if (!initialData && postId) {
            const fetchPost = async () => {
                try {
                    const postData = await getPostWithInteractions(postId);
                    setPost(postData);
                    setIsLiked(postData.userLiked || false);
                    setLikeCount(postData.likeCount || 0);
                    setComments(postData.comments || []);
                    setIsLoading(false);
                } catch (err) {
                    console.error("Error fetching post:", err);
                    setError("Failed to load post");
                    setIsLoading(false);
                }
            };
            fetchPost();
        }
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
        return <div className="loading-container">Loading...</div>;
    }

    if (error) {
        return <div className="error-container">{error}</div>;
    }

    if (!post?.idRecPost && !initialData) {
        return <div className="not-available-container">Post not available</div>;
    }

    return (
        <div className="post-container">
            {/* Post Header */}
            <div className="post-header">
                <img
                    src={post.usuario?.profilePicture || 'https://via.placeholder.com/32x32/cccccc/ffffff?text=U'}
                    alt="Profile"
                    className="profile-picture"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/32x32/cccccc/ffffff?text=U';
                    }}
                />
                <div style={{ flex: 1 }}>
                    <div className="username">
                        {post.usuario?.displayUserName || 'Unknown user'}
                    </div>
                    {post.creationDate && (
                        <div className="post-date">
                            {new Date(post.creationDate).toLocaleDateString()}
                        </div>
                    )}
                </div>
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowOptions(!showOptions)}
                        className="options-button"
                    >
                        &#8942;
                    </button>
                    {showOptions && onDelete && (
                        <div className="options-menu">
                            <button
                                onClick={() => {
                                    onDelete();
                                    setShowOptions(false);
                                }}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Post Content */}
            <div>
                <Carousel imageList={post.images || []} />
            </div>

            {/* Post Stats */}
            {(post.distance || post.duration || post.calories) && (
                <div className="post-stats">
                    {post.distance && <span>🏃‍♂️ {post.distance} km</span>}
                    {post.duration && <span>⏱️ {post.duration} min</span>}
                    {post.calories && <span>🔥 {post.calories} cal</span>}
                </div>
            )}

            {/* Interaction Buttons */}
            <div className="interaction-buttons">
                <button
                    onClick={handleLike}
                    className="interaction-button"
                    style={{ color: isLiked ? '#ed4956' : '#262626' }}
                >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="interaction-button"
                >
                    <FaRegComment />
                </button>
            </div>

            {/* Like Count */}
            <div className="like-count">
                {likeCount} {likeCount === 1 ? 'like' : 'likes'}
            </div>

            {/* Description */}
            {post.description && (
                <div className="post-description">
                    <span className="comment-author">
                        {post.usuario?.displayUserName || 'User'}
                    </span>
                    {post.description}
                </div>
            )}

            {/* Comments Count */}
            {comments.length > 0 && (
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="comments-button"
                >
                    View all {comments.length} comments
                </button>
            )}

            {/* Comments Section */}
            {showComments && (
                <div className="comments-section">
                    {/* Comments List */}
                    <div className="comments-list">
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={comment.id || index} className="comment-item">
                                    <img
                                        src={comment.author?.profilePicture || 'https://via.placeholder.com/24x24/cccccc/ffffff?text=U'}
                                        alt="Commenter"
                                        className="commenter-picture"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/24x24/cccccc/ffffff?text=U';
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div className="comment-text">
                                            <span className="comment-author">
                                                {comment.author?.displayUserName || 'Unknown user'}
                                            </span>
                                            {comment.text}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-comments">
                                No comments yet
                            </div>
                        )}
                    </div>

                    {/* Add Comment Form */}
                    <form onSubmit={handleAddComment} className="comment-form">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="comment-input"
                            required
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className={`comment-submit-button ${newComment.trim() ? 'active' : ''}`}
                        >
                            Post
                        </button>
                    </form>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                </div>
            )}
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