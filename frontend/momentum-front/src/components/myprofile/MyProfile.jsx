import {useEffect, useState} from "react";
import {
    listRecreationalPosts,
    listTrainingPlanPosts,
    getUserRole,
    listProfileInfo,
    deleteRecPost, deleteTrainPost,
    deleteAccount,
    getPostWithInteractions
} from "../../api/functions";
import {RecreationalPost} from "../post/recreationalpost/RecreationalPost";
import {TrainingPlanPost} from "../post/trainingplanpost/TrainingPlanPost";
import RecPostWithInteractions from "../post/recpostformwithinteractions/RecPostFormWithInteractions";
import {Link, useNavigate} from "react-router-dom";
import "./MyProfile.css"
import ButtonNuestro from "../button/ButtonNuestro";
import Navbar from "../navbar/Navbar";
import ProfileNavbar from "../profilenavbar/ProfileNavbar"
import GoalsSelector from "../goals/GoalsSelector";

function MyProfile(){
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [selectedTab, setSelectedTab] = useState("posts");
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
        };
        fetchProfileInfo();
    }, []);

    const [trainingPlanPosts, setTrainingPlanPosts] = useState([]);

    useEffect(() => {
        const fetchTrainingPlanPost = async () => {
            try {
                const trainPosts = await listTrainingPlanPosts();
                console.log("Training Plan Response:" + trainPosts);
                setTrainingPlanPosts(trainPosts);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTrainingPlanPost();
    }, []);

    const [recreationalPosts, setRecreationalPosts] = useState([]);

    useEffect(() => {
        const fetchRecreationalPosts = async () => {
            try {
                const recPosts = await listRecreationalPosts();
                // Carga datos completos con interacciones
                const postsWithInteractions = await Promise.all(
                    recPosts.map(async post => {
                        try {
                            const fullPost = await getPostWithInteractions(post.idRecPost);
                            return fullPost;
                        } catch (error) {
                            console.error(`Error loading interactions for post ${post.idRecPost}:`, error);
                            return post; // Fallback a datos básicos
                        }
                    })
                );
                setRecreationalPosts(postsWithInteractions);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRecreationalPosts();
    }, []);

    async function deleteRecreationalPost(id){
        try {
            await deleteRecPost(id);
        } catch (e){
            console.log(e);
        }
        setRecreationalPosts(prevPosts => prevPosts.filter(post => post.idRecPost !== id));
    }

    async function deleteTrainingPlanPost(id){
        try {
            await deleteTrainPost(id);
        } catch (e){
            console.log(e);
        }
        setTrainingPlanPosts(prevPosts => prevPosts.filter(post => post.idTrainPost !== id));
    }

    async function deleteMyUser(id){
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmDelete) return;
        try {
            await deleteAccount(id);
        } catch (e){
            console.log(e);
        }
        localStorage.removeItem("token");
        navigate("/login");
    }

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
                            <Link to="/myprofile/chats" className="btn btn-primary">Chats</Link>
                            <ButtonNuestro className="btn-danger" text="Delete account" onClick={() => deleteMyUser(userProfile.id)}></ButtonNuestro>
                        </div>
                    </div>
                )}
                <ProfileNavbar selectedTab={selectedTab} onSelectTab={setSelectedTab} />
                {selectedTab === "posts" && userRole === "RUNNER" && (
                    <div className="container-general">
                        <h2 className="section-title">My Posts</h2>
                        <Link className="btn btn-primary" to={"/myprofile/createRecreationalPost"}>
                            New Post
                        </Link>
                        {recreationalPosts.map((post) => (
                            <div className="post-item" key={post.idRecPost}>
                                <div className="post-actions">
                                <ButtonNuestro
                                    className="btn-danger"
                                    text="Delete post"
                                    onClick={() => deleteRecreationalPost(post.idRecPost)}
                                />
                                <Link
                                    className="btn btn-warning"
                                    to={`/myprofile/updateRecreationalPost/${post.idRecPost}`}
                                >
                                    Update Post
                                </Link>
                                </div>
                                <RecPostWithInteractions
                                    id={post.idRecPost}
                                    post={post}
                                    onDelete={() => deleteRecreationalPost(post.idRecPost)}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {selectedTab === "posts" && userRole === "COACH" && (
                    <div className="container-general">
                        <h2 className="section-title">My Training plans</h2>
                        <Link className="btn btn-primary" to={"/myprofile/createTrainingPlan"}>
                            New Post
                        </Link>
                        <div className="profile-content">
                            {trainingPlanPosts?.map((post) => (
                                <div key={post.idTrainPost}>
                                    <ButtonNuestro className="btn-danger" text="Delete post" onClick={() => deleteTrainingPlanPost(post.idTrainPost)}></ButtonNuestro>
                                    <TrainingPlanPost post={post}/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {selectedTab === "Goals" && (
                    <div className="container-general">
                        <h2 className="section-title">My Goals</h2>
                        <p>Aún no tenés metas</p>
                        <GoalsSelector
                            userId={userProfile ? userProfile.id : null}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyProfile;