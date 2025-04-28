

import {useState} from 'react';
import './EventPost.css';

export function EventPostCoach({ post,  handleDelete, handleUpdate ,onUnJoin }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(prev => !prev);
    };

    const handleDeleteClick = async () => {
        try {
            if (handleDelete) {
                await handleDelete(post.idEvent); // Ejecuta la acción correspondiente
            }
        } catch (error) {
            console.error('Error al eliminar el evento', error);
        }
    };

    const handleUpdateClick = async () => {
        try {
            if (handleUpdate) {
                await handleUpdate(post.idEvent);
            }
        } catch (error) {
            console.error('Error al modificar el evento', error);
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
                        </div>
                        {handleUpdate && (
                            <button
                                onClick={handleUpdateClick}
                                className="btn btn-secondary"
                            >
                            Update Event
                            </button>
                        )}
                        {handleDelete && (
                            <button
                                onClick={handleDeleteClick}
                                className="btn btn-danger"
                            >
                            Delete Event
                            </button>
                        )}
                    
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
