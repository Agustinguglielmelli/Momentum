import Carousel from "./carousel/Carousel";

function PostNuevo({ post }){
    return (
        <div className="post">
            {post.usuario && (
                <div className="post-header">
                    <img className="post-user-avatar" src={post.usuario.profilePicture} alt="Profile picture"/>
                    <div className="post-user-info">
                        <div className="post-username">{post.usuario.displayUserName}</div>
                        <div className="post-time">{post.fechaPublicacion}</div>
                    </div>
                </div>
            )}
            <div className="post-content">
                <Carousel imageList={post.images}/>
                <div className="post-text">Calories burnt: {post.calories}</div>
                <div className="post-text">Distance run: {post.distance} kms</div>
                <div className="post-text">Duration: {post.duration} minutes</div>
                <div className="post-text">
                    {post.description}
                </div>
            </div>
            <div className="post-stats">
                <div>18 Me gusta</div>
                <div>5 Comentarios</div>
            </div>
            <div className="post-footer">
                <div className="post-action">👍 Me gusta</div>
                <div className="post-action">💬 Comentar</div>
                <div className="post-action">↗️ Compartir</div>
            </div>
        </div>
    )
}
export default PostNuevo