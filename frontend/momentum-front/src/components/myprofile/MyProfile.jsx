import {useEffect, useState} from "react";
import {listRecreationalPosts} from "../../api/functions";
import {RecreationalPost} from "../post/recreationalpost/RecreationalPost";

function MyProfile(){
    const [recreationalPosts, setRecreationalPosts] = useState([]);

    useEffect(() => {
        const fetchRecreationalPosts = async () => {
            try {
                const posts = await listRecreationalPosts()
                console.log(posts)
                setRecreationalPosts(posts);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecreationalPosts()
    }, [])


    return(
        <div>
            <h1>My posts</h1>
            {recreationalPosts.map((post, index) => (
                <RecreationalPost key={post.idRecPost} post={post} />
            ))}
        </div>
    )
}
export default MyProfile;