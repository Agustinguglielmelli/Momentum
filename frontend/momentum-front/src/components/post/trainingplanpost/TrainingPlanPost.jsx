import "./css.css";
import React, {useEffect, useState} from "react";
import axios from "axios";

export function TrainingPlanPost({ post }) {
    const [likeCount, setLikeCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showComments, setShowComments] = useState(false);

    const postId = post.idTrainPost;
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
        <div className="post-container">
            <div className="post-card">
                {post.usuario && (
                    <div>
                        <div className="post-header">
                            <img src={post.usuario.profilePicture} alt="Profile picture"/>
                            <h1>{post.usuario.displayUserName}</h1>
                        </div>
                    </div>
                )}
                <h2 className="post-title">{post.title}</h2>
                <div className="post-body">
                    <p><strong>Description:</strong> {post.description}</p>
                    <p><strong>Duration:</strong> {post.duration}</p>
                    <p><strong>Frequency:</strong> {post.frequency}</p>
                </div>
                <ul className="post-days">
                    {post.dia1 && <li>Day 1: {post.dia1}</li>}
                    {post.dia2 && <li>Day 2: {post.dia2}</li>}
                    {post.dia3 && <li>Day 3: {post.dia3}</li>}
                    {post.dia4 && <li>Day 4: {post.dia4}</li>}
                    {post.dia5 && <li>Day 5: {post.dia5}</li>}
                    {post.dia6 && <li>Day 6: {post.dia6}</li>}
                    {post.dia7 && <li>Day 7: {post.dia7}</li>}
                </ul>
            </div>
        </div>
    );
}
