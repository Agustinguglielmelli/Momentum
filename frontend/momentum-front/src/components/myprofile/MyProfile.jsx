import {useEffect, useState} from "react";
import {listRecreationalPosts} from "../../api/functions";
import {RecreationalPost} from "../post/recreationalpost/RecreationalPost";

function MyProfile(){
    const [recreationalPosts, setRecreationalPosts] = useState([]);

    useEffect(() => {
        const fetchRecreationalPosts = async () => {
            try {
                setRecreationalPosts(await listRecreationalPosts());
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecreationalPosts()
    }, [])


    return(
        <div>
            <h1>My posts</h1>
            
        </div>
    )
}
export default MyProfile;