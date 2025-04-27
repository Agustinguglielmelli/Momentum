

import {useState} from 'react';
import './EventPost.css';
import { unJoin } from '../../../api/functions';

export function EventPost({ post, onUnJoin }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(prev => !prev);
    };

    const handleUnJoin = async () => {
        try {
            await unJoin(post.idEvent); 
            if (onUnJoin) {
                onUnJoin(post.idEvent);
            }
        } catch (error) {
            console.error('Error al salir del evento', error);
        }
    };
    

    return (
        <div className="card mb-3 card-custom" >
            <div className="row g-0">
                <div className="col-12">
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

                        <div className="d-flex gap-2 mt-3">
                            <button 
                                onClick={toggleExpanded} 
                                className="btn btn-primary"
                            >
                                {expanded ? 'Show Less' : 'Show More'}
                            </button>
                            {onUnJoin && (
                                <button 
                                    onClick={handleUnJoin} 
                                    className="btn btn-danger"
                                >
                                    Leave Event
                                </button>
                            )}
                        </div>
                        {expanded && (
                            <div className="mt-3">
                                <p className="card-text">
                                    <strong>Description:</strong> {post?.description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
