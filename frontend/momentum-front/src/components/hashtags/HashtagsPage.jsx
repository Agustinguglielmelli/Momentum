import React from 'react';
import HashtagSearch from './HashtagSearch';
import TrendingHashtags from './TrendingHashtags';
import { useNavigate } from 'react-router-dom';

const HashtagsPage = () => {
    const navigate = useNavigate();

    const handleHashtagSelect = (hashtag) => {
        navigate(`/hashtag/${hashtag}`);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
            <HashtagSearch onHashtagSelect={handleHashtagSelect} />
            <TrendingHashtags />
        </div>
    );
};

export default HashtagsPage;
