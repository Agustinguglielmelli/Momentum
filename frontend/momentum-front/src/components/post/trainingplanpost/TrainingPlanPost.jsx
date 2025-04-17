
export function TrainingPlanPost({ post }) {

    return (
        <div className="card w-25 ">
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">
                    {post.description}
                </p>
                <p className="card-text">
                    Duration: {post.duration}
                </p>
                <p className="card-text">
                    Frequency: {post.description}
                </p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Day 1: {post.dia1}</li>
                <li className="list-group-item">Day 2: {post.dia2}</li>
                <li className="list-group-item">Day 3: {post.dia3}</li>
                <li className="list-group-item">Day 4: {post.dia4}</li>
                <li className="list-group-item">Day 5: {post.dia5}</li>
                <li className="list-group-item">Day 6: {post.dia6}</li>
                <li className="list-group-item">Day 7: {post.dia7}</li>
            </ul>
        </div>
    )

}