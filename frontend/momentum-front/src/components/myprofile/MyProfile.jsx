import {useEffect, useState} from "react";
import axios from "axios";
import {listRecreationalPosts, listTrainingPlanPosts, getUserRole, listProfileInfo} from "../../api/functions";
import {RecreationalPost} from "../post/recreationalpost/RecreationalPost";
import {TrainingPlanPost} from "../post/trainingplanpost/TrainingPlanPost";
import {Link} from "react-router-dom";
import "./MyProfile.css"
import VerticalDivider from "../divider/Divider";
import Button from "../button/Button";
import {deleteUser} from "../table/Table";
import Navbar from "../navbar/Navbar";



function MyProfile(){
    const [userRole, setUserRole] = useState(null);
    useEffect(() => {
        const role = getUserRole();
        setUserRole(role);
    }, []);

    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
            const user = await listProfileInfo();
            console.log("respuesta:", user);
            setUserProfile(user);
            } catch (error){
                console.log(error)
            }
        }
        fetchProfileInfo();
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
        fetchRecreationalPosts();
    }, [])

    return(
        <div>
            <Navbar/>
            <div className="profile-container">
                {userProfile && (
                    <div className="User-info">
                        <div className="user-details">
                            <img src={userProfile.profilePicture} alt="profilePicture" className="profile-picture"/>
                            <h2>{userProfile.displayUserName}</h2>
                            <Link to="/myprofile/modifyUser" className="btn btn-warning">Modify profile</Link>

                        </div>

                    </div>
                )}

                {userRole === "RUNNER" && (
                    <div className="container-general">
                        <h2 className="section-title">My Posts</h2>
                        <Link className="btn btn-primary" to={"/myprofile/createRecreationalPost"}>
                            New Post
                        </Link>
                        <div className="profile-content">
                            {recreationalPosts.map((post) => (
                                <RecreationalPost key={post.idRecPost} post={post}/>
                            ))}

                        </div>
                    </div>
                )}

                <section className="left">
                    {userRole === "COACH" && (
                        <div className="profile-content">
                            <section className="profile-left">
                        <h2 className="section-title">My training plans</h2>
                        {trainingPlanPosts?.map((post) => (
                            <TrainingPlanPost key={post.idTrainPost} post={post} />
                        ))}
                        </section>
                        <VerticalDivider/>
                        <section className="profile-right">
                        <h2 className="section-title">Create training plans</h2>
                        <Link className="btn btn-primary" to={"/myprofile/createTrainingPlan"}>
                            New Post
                        </Link>
                        </section>
                    </div>
                )}
                </section>
            </div>
        </div>
    )
}
export default MyProfile;