import React, { useState, useEffect } from 'react';
import { TrendingUp, Hash } from 'lucide-react';

const TrendingHashtags = () => {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/hashtags/trending?limit=15')
            .then(res => res.json())
            .then(data => {
                setTrending(data.trending);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching trending hashtags:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-xl font-bold text-gray-800">Tendencias</h2>
                </div>
                <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">Tendencias</h2>
            </div>
            <div className="space-y-3">
                {trending.map((item, index) => (
                    <div
                        key={item.hashtag}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        onClick={() => window.location.href = `/hashtag/${item.hashtag}`}
                    >
                        <div className="flex items-center">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                {index + 1}
              </span>
                            <div>
                                <div className="flex items-center">
                                    <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                    <span className="font-medium text-gray-800">{item.hashtag}</span>
                                </div>
                                <span className="text-sm text-gray-500">{item.count} publicaciones</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingHashtags;
