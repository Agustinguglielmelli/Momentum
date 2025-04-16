import {useEffect, useState} from "react";
import {listRecreationalPosts, listTrainingPlanPosts, getUserRole} from "../../api/functions";
import {RecreationalPost} from "../post/recreationalpost/RecreationalPost";

function MyProfile(){
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const role = getUserRole();
        setUserRole(role);
    }, []);

    const [trainingPlanPosts, setTrainingPlanPosts] = useState([]);

    useEffect( () => {
        const fetchTrainingPlanPost = async () => {
            try {
                const posts = await listTrainingPlanPosts()
                console.log(posts)
                setTrainingPlanPosts(posts);

            } catch (error) {
                console.error(error);
            }
        }
        fetchTrainingPlanPost();
    },[])

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
            {recreationalPosts.map((post) => (
                <RecreationalPost key={post.idRecPost} post={post} />
            ))}
        </div>
    )
}
export default MyProfile;