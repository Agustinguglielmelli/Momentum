

import { useState } from 'react';
import './EventPost.css';

export function EventPost({ post }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="card mb-3 card-custom" >
            <div className="row g-0">
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{post?.title}</h5>
                        <p className="card-text">
                            <strong>Start At Place:</strong> {post?.startAtPlace}
                        </p>
                        <p className="card-text">
                            <strong>End At Place:</strong> {post?.endAtPlace}
                        </p>
                        <p className="card-text">
                            <strong>KM To Run:</strong> {post?.kmToRun}
                        </p>
                        <p className="card-text">
                            <strong>Date:</strong> {post?.date}
                        </p>

                        <button 
                            onClick={toggleExpanded} 
                            className="btn btn-primary mt-2"
                        >
                            {expanded ? 'Show less' : 'Show more'}
                        </button>

                        <div className={`collapse-description ${expanded ? 'show' : ''}`}>
                            <p className="card-text mt-3">
                                <strong>Description:</strong> {post?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
