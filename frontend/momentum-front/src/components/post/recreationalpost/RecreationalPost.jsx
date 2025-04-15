import Carousel from "../../carousel/Carousel";
import "./RecreationalPost.css";

export function RecreationalPost({ post }) {

    return (

        <div className="recreational-post-card">
            <div className="recreational-post-carousel-container">
                <Carousel imageList={post.images}/>
            </div>

            <div className="recreational-post-body">
                <p className="recreational-post-description">
                    Distancia recorrida: {post.distance} kms
                </p>
                <p className="recreational-post-description">
                    Duración: {post.distance}{post.description}
                </p>
                {post.calories != null && (
                <p className="recreational-post-description">
                    Calorias quemadas: {post.calories}
                </p>
                )}
                <p className="recreational-post-description">
                    {post.description}
                </p>
            </div>
        </div>
    )
}
