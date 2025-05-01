import "./css.css";

export function TrainingPlanPost({ post }) {
    return (
        <div className="post-container">
            <div className="post-card">
                {post.usuario && (
                    <div>
                        <div className="post-header">
                            <img src={post.usuario.profilePicture} alt="Profile picture"/>
                            <h1>{post.usuario.displayUserName}</h1>
                        </div>
                    </div>
                )}
                <h2 className="post-title">{post.title}</h2>
                <div className="post-body">
                    <p><strong>Description:</strong> {post.description}</p>
                    <p><strong>Duration:</strong> {post.duration}</p>
                    <p><strong>Frequency:</strong> {post.frequency}</p>
                </div>
                <ul className="post-days">
                    {post.dia1 && <li>Day 1: {post.dia1}</li>}
                    {post.dia2 && <li>Day 2: {post.dia2}</li>}
                    {post.dia3 && <li>Day 3: {post.dia3}</li>}
                    {post.dia4 && <li>Day 4: {post.dia4}</li>}
                    {post.dia5 && <li>Day 5: {post.dia5}</li>}
                    {post.dia6 && <li>Day 6: {post.dia6}</li>}
                    {post.dia7 && <li>Day 7: {post.dia7}</li>}
                </ul>
            </div>
        </div>
    );
}
