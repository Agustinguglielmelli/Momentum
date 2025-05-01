import Carousel from "../../carousel/Carousel";
import "./RecreationalPost.css";

export function RecreationalPost({ post }) {

    return (
        <div className="recreational-post-card">
            {post.usuario && (
                <div className="post-header">
                    <img src={post.usuario.profilePicture} alt="Profile picture"/>
                    <h1>{post.usuario.displayUserName}</h1>
                </div>
            )}
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
