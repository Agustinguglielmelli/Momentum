import {useEffect, useState} from "react";
import {listRecreationalPosts, listTrainingPlanPosts, getUserRole} from "../../api/functions";
import {RecreationalPost} from "../post/recreationalpost/RecreationalPost";
import {TrainingPlanPost} from "../post/trainingplanpost/TrainingPlanPost";
import {Link} from "react-router-dom";
import "./css.css"



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
                const trainPosts = await listTrainingPlanPosts()
                console.log("Training Plan Response:" + trainPosts)
                setTrainingPlanPosts(trainPosts);

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
                const recPosts = await listRecreationalPosts()
                console.log(recPosts)
                setRecreationalPosts(recPosts);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecreationalPosts()
    }, [])


    return(
        <div className="profile-container">
            <h1 className="profile-title">My profile ({userRole})</h1>

            {userRole === "RUNNER" && (
                <>
                    <Link className="btn btn-primary" to={"/myprofile/createRecreationalPost"}>
                        New Post
                    </Link>

                    <h2 className="section-title">My posts</h2>
                    {recreationalPosts.map((post) => (
                        <RecreationalPost key={post.idRecPost} post={post} />
                    ))}
                </>
            )}

            {userRole === "COACH" && (
                <>
                    <Link className="btn btn-primary" to={"/myprofile/createTrainingPlan"}>
                        New Post
                    </Link>
                    <h2 className="section-title">My training plans</h2>
                    {trainingPlanPosts.map((post) => (
                        <TrainingPlanPost key={post.idTrainPost} post={post} />
                    ))}
                </>
            )}
        </div>
    )
}
export default MyProfile;