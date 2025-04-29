import Carousel from "../../carousel/Carousel";
import "./RecreationalPost.css";

export function RecreationalPost({ post }) {

    return (

        <div className="recreational-post-card">
            <div className="recreational-post-carousel-container">
                <Carousel imageList={post.images} />
            </div>
            <div className="user-info">
                <h1>{}</h1>
            </div>
            <div className="recreational-post-body">
                <p className="recreational-post-description">
                    Distance run: {post.distance} kms
                </p>
                <p className="recreational-post-description">
                    Duration: {post.distance}{post.description}
                </p>
                {post.calories != null && (
                <p className="recreational-post-description">
                    Calories burnt: {post.calories}
                </p>
                )}
                <p className="recreational-post-description">
                    {post.description}
                </p>
            </div>
        </div>
    )
}
