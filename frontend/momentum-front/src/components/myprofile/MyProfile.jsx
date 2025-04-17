import {useEffect, useState} from "react";
import {listRecreationalPosts, listTrainingPlanPosts, getUserRole} from "../../api/functions";
import {RecreationalPost} from "../post/recreationalpost/RecreationalPost";
import {TrainingPlanPost} from "../post/trainingplanpost/TrainingPlanPost";
import {Link} from "react-router-dom";

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
            <h1>My profile ({userRole})</h1>

            {userRole === "RUNNER" && (
                <>
                    <Link className="btn btn-primary" to={"/miperfil/createRecreativePost"}>
                        New Post
                    </Link>

                    <h2>My posts</h2>
                    {recreationalPosts.map((post) => (
                        <RecreationalPost key={post.idRecPost} post={post} />
                    ))}
                </>
            )}

            {userRole === "COACH" && (
                <>
                    <Link className="btn btn-primary" to={"/miperfil/createTrainingPlan"}>
                        New Post
                    </Link>
                    <h2>My Posts</h2>
                    <div className="container">
                         <TrainingPlanPost/>
                    </div>
                </>
            )}
        </div>
    )
}
export default MyProfile;