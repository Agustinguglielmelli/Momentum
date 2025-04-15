import Carousel from "../../carousel/Carousel";
export function RecreationalPost({ post }) {

    return (

        <div className="card">
            <Carousel imageList = {post.images} />
            <div className="card-body">
                <p className="card-text">{post.description}</p>
            </div>
        </div>
    )
}
