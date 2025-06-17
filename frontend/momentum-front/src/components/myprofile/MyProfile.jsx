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
import {Link, useNavigate, useParams} from "react-router-dom";
import "./MyProfile.css"
import ButtonNuestro from "../button/ButtonNuestro";
import Navbar from "../navbar/Navbar";
import ProfileNavbar from "../profilenavbar/ProfileNavbar"
import GoalsSelector from "../goals/GoalsSelector";
import LogoutButton from "../logoutbutton/LogoutButton";
import PostNuevo from "../PostNuevo";
import axios from "axios";

function MyProfile(){
    const navigate = useNavigate();
    const { userId } = useParams(); // Obtener userId de la URL
    const [userRole, setUserRole] = useState(null);
    const [selectedTab, setSelectedTab] = useState("posts");
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // Determinar si es el propio perfil o el de otro usuario
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/usuario/listMyInfo', config);
                const currentUser = response.data;
                setCurrentUserId(currentUser.id);

                // Si no hay userId en la URL o es igual al usuario actual, es el propio perfil
                const isOwn = !userId || parseInt(userId) === currentUser.id;
                setIsOwnProfile(isOwn);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchCurrentUser();

        const role = getUserRole();
        setUserRole(role);
    }, [userId]);

    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                let user;
                if (isOwnProfile) {
                    // Si es el propio perfil, usar el endpoint actual
                    user = await listProfileInfo();
                } else {
                    // Si es el perfil de otro usuario, usar el endpoint con userId
                    const response = await axios.get(`http://localhost:8080/usuario/listMyInfo/${userId}`, config);
                    user = response.data;
                }
                console.log("respuesta:", user);
                setUserProfile(user);
            } catch (error){
                console.log(error)
            }
        };

        if (currentUserId !== null) { // Solo ejecutar cuando sepamos si es propio perfil o no
            fetchProfileInfo();
        }
    }, [isOwnProfile, userId, currentUserId]);

    const [trainingPlanPosts, setTrainingPlanPosts] = useState([]);

    useEffect(() => {
        const fetchTrainingPlanPost = async () => {
            try {
                let trainPosts;
                if (isOwnProfile) {
                    trainPosts = await listTrainingPlanPosts();
                } else {
                    // Obtener posts de entrenamiento de otro usuario
                    const response = await axios.get(`http://localhost:8080/usuario/${userId}/trainingPlanPosts`, config);
                    trainPosts = response.data;
                }
                console.log("Training Plan Response:" + trainPosts);
                setTrainingPlanPosts(trainPosts);
            } catch (error) {
                console.error(error);
            }
        };

        if (currentUserId !== null) {
            fetchTrainingPlanPost();
        }
    }, [isOwnProfile, currentUserId]);

    const [recreationalPosts, setRecreationalPosts] = useState([]);

    useEffect(() => {
        const fetchRecreationalPosts = async () => {
            try {
                let recPosts;
                if (isOwnProfile) {
                    recPosts = await listRecreationalPosts();
                } else {
                    // Obtener posts recreacionales de otro usuario
                    const response = await axios.get(`http://localhost:8080/usuario/${userId}/recreationalPosts`, config);
                    recPosts = response.data;
                }
                console.log("Recreational Posts Response:", recPosts);

                if (recPosts.length > 0) {
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
                } else {
                    setRecreationalPosts([]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (currentUserId !== null) {
            fetchRecreationalPosts();
        }
    }, [isOwnProfile, currentUserId]);

    async function deleteRecreationalPost(id){
        if (!isOwnProfile) return; // Solo permitir eliminar en el propio perfil

        try {
            await deleteRecPost(id);
        } catch (e){
            console.log(e);
        }
        setRecreationalPosts(prevPosts => prevPosts.filter(post => post.idRecPost !== id));
    }

    async function deleteTrainingPlanPost(id){
        if (!isOwnProfile) return; // Solo permitir eliminar en el propio perfil

        try {
            await deleteTrainPost(id);
        } catch (e){
            console.log(e);
        }
        setTrainingPlanPosts(prevPosts => prevPosts.filter(post => post.idTrainPost !== id));
    }

    async function deleteMyUser(id){
        if (!isOwnProfile) return; // Solo permitir eliminar el propio perfil

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

                        {/* Solo mostrar acciones si es el propio perfil */}
                        {isOwnProfile && (
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
                        )}
                    </div>
                )}

                {/* Navegación moderna */}
                <div className="profile-nav-modern">
                    <button
                        className={`nav-tab-modern ${selectedTab === "posts" ? "active" : ""}`}
                        onClick={() => handleTabChange("posts")}
                    >
                        📝 {userRole === "RUNNER" ? "Posts" : "Training Plans"}
                    </button>
                    {/* Solo mostrar Goals si es el propio perfil */}
                    {isOwnProfile && (
                        <button
                            className={`nav-tab-modern ${selectedTab === "Goals" ? "active" : ""}`}
                            onClick={() => handleTabChange("Goals")}
                        >
                            🎯 Goals
                        </button>
                    )}
                </div>

                {/* Contenido de Posts para RUNNER */}
                {selectedTab === "posts" && userRole === "RUNNER" && (
                    <div className="content-section-modern">
                        <div className="section-header-modern">
                            <h2 className="section-title-modern">
                                {isOwnProfile ? "My Posts" : `${userProfile?.displayUserName}'s Posts`}
                            </h2>
                            {/* Solo mostrar botón de crear post si es el propio perfil */}
                            {isOwnProfile && (
                                <Link className="new-post-btn" to={"/myprofile/createRecreationalPost"}>
                                    ➕ New Post
                                </Link>
                            )}
                        </div>

                        {recreationalPosts.length > 0 ? (
                            <div className="posts-grid-modern">
                                {recreationalPosts.map((post) => (
                                    <div key={post.idRecPost} className="post-card-wrapper">
                                        {/* Solo mostrar botón de eliminar si es el propio perfil */}
                                        {isOwnProfile && (
                                            <button
                                                className="post-delete-btn"
                                                onClick={() => deleteRecreationalPost(post.idRecPost)}
                                            >
                                                🗑️ Delete
                                            </button>
                                        )}
                                        <PostNuevo post={post}/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">📝</div>
                                <h3 className="empty-state-title">
                                    {isOwnProfile ? "No posts yet" : "No posts to show"}
                                </h3>
                                <p className="empty-state-text">
                                    {isOwnProfile
                                        ? "Share your running experiences with the community!"
                                        : "This user hasn't shared any posts yet."
                                    }
                                </p>
                                {isOwnProfile && (
                                    <Link className="new-post-btn" to={"/myprofile/createRecreationalPost"}>
                                        Create Your First Post
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Contenido de Posts para COACH */}
                {selectedTab === "posts" && userRole === "COACH" && (
                    <div className="content-section-modern">
                        <div className="section-header-modern">
                            <h2 className="section-title-modern">
                                {isOwnProfile ? "My Training Plans" : `${userProfile?.displayUserName}'s Training Plans`}
                            </h2>
                            {/* Solo mostrar botón de crear plan si es el propio perfil */}
                            {isOwnProfile && (
                                <Link className="new-post-btn" to={"/myprofile/createTrainingPlan"}>
                                    ➕ New Plan
                                </Link>
                            )}
                        </div>

                        {trainingPlanPosts.length > 0 ? (
                            <div className="posts-grid-modern">
                                {trainingPlanPosts.map((post) => (
                                    <div key={post.idTrainPost} className="post-card-wrapper">
                                        {/* Solo mostrar botón de eliminar si es el propio perfil */}
                                        {isOwnProfile && (
                                            <button
                                                className="post-delete-btn"
                                                onClick={() => deleteTrainingPlanPost(post.idTrainPost)}
                                            >
                                                🗑️ Delete
                                            </button>
                                        )}
                                        <TrainingPlanPost post={post}/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">🏋️‍♂️</div>
                                <h3 className="empty-state-title">
                                    {isOwnProfile ? "No training plans yet" : "No training plans to show"}
                                </h3>
                                <p className="empty-state-text">
                                    {isOwnProfile
                                        ? "Create your first training plan to help runners achieve their goals!"
                                        : "This coach hasn't shared any training plans yet."
                                    }
                                </p>
                                {isOwnProfile && (
                                    <Link className="new-post-btn" to={"/myprofile/createTrainingPlan"}>
                                        Create Your First Plan
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Sección de Goals - solo para el propio perfil */}
                {selectedTab === "Goals" && isOwnProfile && (
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