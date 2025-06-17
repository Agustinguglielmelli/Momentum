import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const HashtagDetailPage = () => {
    const { hashtag } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`/api/hashtags/${encodeURIComponent(hashtag)}/posts`)
            .then(res => res.json())
            .then(data => setPosts(data.posts || []))
            .catch(err => console.error('Error fetching hashtag posts:', err));
    }, [hashtag]);

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">#{hashtag}</h1>
            {posts.length === 0 ? (
                <p className="text-gray-500">No hay publicaciones con este hashtag.</p>
            ) : (
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li key={post.id} className="p-4 border rounded-lg shadow-sm">
                            <p className="text-gray-800">{post.content}</p>
                            <span className="text-sm text-gray-500">por {post.user}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HashtagDetailPage;
