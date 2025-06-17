import React, { useState, useEffect } from 'react';
import { Search, Hash } from 'lucide-react';

const HashtagSearch = ({ onHashtagSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (searchTerm.length > 1) {
            setIsSearching(true);
            const timeoutId = setTimeout(() => {
                fetch(`/api/hashtags/search?q=${encodeURIComponent(searchTerm)}`)
                    .then(res => res.json())
                    .then(data => {
                        setResults(data.hashtags);
                        setIsSearching(false);
                    })
                    .catch(err => {
                        console.error('Error searching hashtags:', err);
                        setIsSearching(false);
                    });
            }, 300);

            return () => clearTimeout(timeoutId);
        } else {
            setResults([]);
        }
    }, [searchTerm]);

    return (
        <div className="relative">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar hashtags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {(results.length > 0 || isSearching) && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {isSearching ? (
                        <div className="p-3 text-center text-gray-500">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mx-auto"></div>
                        </div>
                    ) : (
                        results.map((hashtag) => (
                            <div
                                key={hashtag}
                                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                onClick={() => {
                                    if (onHashtagSelect) onHashtagSelect(hashtag);
                                    setSearchTerm('');
                                    setResults([]);
                                }}
                            >
                                <Hash className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-gray-800">{hashtag}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default HashtagSearch;
