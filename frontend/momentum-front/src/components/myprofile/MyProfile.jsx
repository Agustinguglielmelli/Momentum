import {useEffect, useState} from "react";
import {
    deleteAccount,
    deleteRecPost,
    deleteTrainPost,
    getPostWithInteractions,
    getUserRole,
    listProfileInfo,
    listRecreationalPosts,
    listTrainingPlanPosts
} from "../../api/functions";
import {TrainingPlanPost} from "../post/trainingplanpost/TrainingPlanPost";
import {Link, useNavigate} from "react-router-dom";
import "./MyProfile.css"
import ButtonNuestro from "../button/ButtonNuestro";
import Navbar from "../navbar/Navbar";
import ProfileNavbar from "../profilenavbar/ProfileNavbar"
import GoalsSelector from "../goals/GoalsSelector";
import LogoutButton from "../logoutbutton/LogoutButton";
import PostNuevo from "../PostNuevo";

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
                console.log("Recreational Posts Response:", recPosts);
                // Carga datos completos con interacciones
                const postsWithInteractions = await Promise.all(
                    recPosts.map(async post => {
                        try {
                            console.log(post.idRecPost);
                            return await getPostWithInteractions(post.idRecPost);
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

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return(
        <div>
            <Navbar/>
            <div className="profile-container">
                {userProfile && (
                    <div className="user-info-modern">
                        <div className="user-header-content">
                            <img
                                src={userProfile.profilePicture}
                                alt="Profile"
                                className="profile-picture-modern"
                            />
                            <div className="user-info-content">
                                <h1 className="user-name-modern">{userProfile.displayUserName}</h1>
                                <span className="user-role-badge">
                                    {userRole === "RUNNER" ? "🏃‍♂️ Runner" : "🏋️‍♂️ Coach"}
                                </span>
                            </div>
                        </div>
                        <div className="user-actions-modern">
                            <Link to="/myprofile/modifyUser" className="btn-modern btn-edit">
                                ✏️ Edit Profile
                            </Link>
                            <Link to="/myprofile/chats" className="btn-modern btn-chat">
                                💬 Chats
                            </Link>
                            <LogoutButton className="btn-modern btn-logout" />
                            <ButtonNuestro
                                className="btn-modern btn-delete"
                                text="🗑️ Delete Account"
                                onClick={() => deleteMyUser(userProfile.id)}
                            />

                        </div>
                    </div>
                )}

                {/* Navegación moderna */}
                <div className="profile-nav-modern">
                    <button
                        className={`nav-tab-modern ${selectedTab === "posts" ? "active" : ""}`}
                        onClick={() => handleTabChange("posts")}
                    >
                        📝 {userRole === "RUNNER" ? "My Posts" : "Training Plans"}
                    </button>
                    <button
                        className={`nav-tab-modern ${selectedTab === "Goals" ? "active" : ""}`}
                        onClick={() => handleTabChange("Goals")}
                    >
                        🎯 Goals
                    </button>
                </div>

                {/* Contenido de Posts para RUNNER */}
                {selectedTab === "posts" && userRole === "RUNNER" && (
                    <div className="content-section-modern">
                        <div className="section-header-modern">
                            <h2 className="section-title-modern">My Posts</h2>
                            <Link className="new-post-btn" to={"/myprofile/createRecreationalPost"}>
                                ➕ New Post
                            </Link>
                        </div>

                        {recreationalPosts.length > 0 ? (
                            <div className="posts-grid-modern">
                                {recreationalPosts.map((post) => (
                                    <div key={post.idRecPost} className="post-card-wrapper">
                                        {/*<Link
                                            className="post-modify-btn"
                                            to={`/myprofile/updateRecreationalPost/${post.idRecPost}`}
                                        >
                                             Edit
                                        </Link>*/}
                                        <button
                                            className="post-delete-btn"
                                            onClick={() => deleteRecreationalPost(post.idRecPost)}
                                        >
                                            🗑️ Delete
                                        </button>
                                        <PostNuevo post={post}/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">📝</div>
                                <h3 className="empty-state-title">No posts yet</h3>
                                <p className="empty-state-text">
                                    Share your running experiences with the community!
                                </p>
                                <Link className="new-post-btn" to={"/myprofile/createRecreationalPost"}>
                                    Create Your First Post
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Contenido de Posts para COACH */}
                {selectedTab === "posts" && userRole === "COACH" && (
                    <div className="content-section-modern">
                        <div className="section-header-modern">
                            <h2 className="section-title-modern">My Training Plans</h2>
                            <Link className="new-post-btn" to={"/myprofile/createTrainingPlan"}>
                                ➕ New Plan
                            </Link>
                        </div>

                        {trainingPlanPosts.length > 0 ? (
                            <div className="posts-grid-modern">
                                {trainingPlanPosts.map((post) => (
                                    <div key={post.idTrainPost} className="post-card-wrapper">
                                        <button
                                            className="post-delete-btn"
                                            onClick={() => deleteTrainingPlanPost(post.idTrainPost)}
                                        >
                                            🗑️ Delete
                                        </button>
                                        <TrainingPlanPost post={post}/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">🏋️‍♂️</div>
                                <h3 className="empty-state-title">No training plans yet</h3>
                                <p className="empty-state-text">
                                    Create your first training plan to help runners achieve their goals!
                                </p>
                                <Link className="new-post-btn" to={"/myprofile/createTrainingPlan"}>
                                    Create Your First Plan
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Sección de Goals */}
                {selectedTab === "Goals" && (
                    <div className="goals-section-modern">
                        <h2 className="section-title-modern">🎯 My Goals</h2>
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