import {useEffect, useState} from "react";
import {listRecreationalPosts, listTrainingPlanPosts, getUserRole} from "../../api/functions";
import {RecreationalPost} from "../post/recreationalpost/RecreationalPost";
import {TrainingPlanPost} from "../post/trainingplanpost/TrainingPlanPost";
import {Link} from "react-router-dom";
import "./MyProfile.css"
import VerticalDivider from "../divider/Divider";



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
            <h1 className="profile-title"> WELCOME TO YOUR PROFILE {userRole}!!</h1>
           

            {userRole === "RUNNER" && (
                <div className="profile-content">
                    
                    <section className="profile-left">
                        <h2 className="section-title">My Posts</h2>
                        <Link className="btn btn-primary" to={"/myprofile/createRecreationalPost"}>
                        New Post
                        </Link>
                        {recreationalPosts.map((post) => (
                        <RecreationalPost key={post.idRecPost} post={post} />
                    ))}
                    </section>
                    <VerticalDivider/>
                    <section className="profile-right">
                    <h2 className="section-title">My Goals</h2>
                    <Link className="btn btn-secondary">
                        New Goal
                    </Link>
                    <p>
                        You don't have any goals yet
                    </p>
                    </section>
                </div>
            )}
            
            <section className="left">
            {userRole === "COACH" && (
                <div className="profile-content">
                    <section className= "profile-left">
                    <h2 className="section-title">My training plans</h2>
                    {trainingPlanPosts.map((post) => (
                        <TrainingPlanPost key={post.idTrainPost} post={post} />
                    ))}
                    </section>
                    <VerticalDivider/>
                    <section className="profile-right">

                    <Link className="btn btn-primary" to={"/myprofile/createTrainingPlan"}>
                        New Post
                    </Link>
                    </section>
                </div>
            )}
            </section>
        </div>
    )
}
export default MyProfile;