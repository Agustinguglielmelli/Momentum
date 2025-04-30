import Carousel from "../../carousel/Carousel";
import "./RecreationalPost.css";

export function RecreationalPost({ post }) {

    return (

        <div className="recreational-post-card">
            <div className="post-header">
                <h1>{}</h1>
            </div>
            <div className="post-carousel">
                <Carousel imageList={post.images}/>
            </div>
            <div className="post-body">
                <p className="recreational-post-description">
                    Distance run: {post.distance} kms
                </p>
                <p className="post-description">
                    Duration: {post.distance}{post.description}
                </p>
                {post.calories != null && (
                    <p className="post-description">
                        Calories burnt: {post.calories}
                    </p>
                )}
                <p className="post-description">
                    {post.description}
                </p>
            </div>
        </div>
    )
}
