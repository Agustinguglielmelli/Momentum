import LogoutButton from "../logoutbutton/LogoutButton";
import Navbar from "../navbar/Navbar";
import SearchUserBar from "../searchbar/SearchUserBar";
import "./HomeCss.css"
import {useEffect, useState} from "react";
import {
    follow, listFollowedUsers,
    listFollowingRecreationalPosts,
    listFollowingTrainingPlansPosts,
    listUsersByNameSearch, unFollow
} from "../../api/functions";
import {RecreationalPost} from "../post/recreationalpost/RecreationalPost";
import {TrainingPlanPost} from "../post/trainingplanpost/TrainingPlanPost";
import Button from "../button/Button";


function Home(){
    const [followingRecreationalPosts, setFollowingRecreationalPosts] = useState([]);
    const [followingTrainingPlanPosts,setFollowingTrainingPlanPosts ] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);


    // fucnion para buscar usuarios
    const handleSearch = async (event) => {
        setUserSearch(event.target.value);
        if (event.target.value.trim() === "") {
            setUsers([]); // Si el campo de búsqueda está vacío, limpia los resultados
        } else {
            try {
                const response = await listUsersByNameSearch(event.target.value);
                console.log("Full response:", response);
                console.log("Response data:", response.data);  // Verifica la respuesta completa

                if (Array.isArray(response.data)) {
                    setUsers(response.data); // Solo actualizar si la respuesta es un array
                } else {
                    console.error('Error: La respuesta no es un array:', response.data);
                    setUsers([]); // Limpiar si no es un array
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
    };


    useEffect(() => {
        const fetchFollowingRecreationalPosts = async () => {
            try {
                const posts = await listFollowingRecreationalPosts();
                console.log(posts);
                setFollowingRecreationalPosts(posts);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFollowingRecreationalPosts();
    }, []);

    useEffect(() => {
        const fetchFollowingTrainingPlanPosts = async () => {
            try {
                const posts = await listFollowingTrainingPlansPosts();
                console.log(posts);
                setFollowingTrainingPlanPosts(posts);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFollowingTrainingPlanPosts();
    }, []);

    const handleFollow = async (userId) => {
        try {
            const response = await follow(userId);
            console.log("Respuesta del servidor:", response);
            if (response.status === 200) {
                // Si la solicitud fue exitosa, actualiza el estado
                setFollowedUsers((prevFollowed) => [...prevFollowed, userId]);
                console.log(`Usuario ${userId} seguido con éxito`);
            }
        } catch (error) {
            console.error("Error al seguir al usuario:", error);
        }
    };

    const handleUnfollow = async (userId) => {
        try {
            // Llamada al endpoint de unfollow
            const response = await unFollow(userId);

            if (response.status === 200) {
                // Si la solicitud fue exitosa, actualiza el estado
                setFollowedUsers((prevFollowed) => prevFollowed.filter(id => id !== userId)); // elimina el user id que antes estaba y ahora no pq dejo de seguir
                console.log(`Has dejado de seguir al usuario ${userId}`);
            }
        } catch (error) {
            console.error("Error al dejar de seguir al usuario:", error);
        }
    };

    useEffect(() => {
        const fetchFollowedUsers = async () => {
            try {
                const response = await listFollowedUsers();
                if (Array.isArray(response.data)) {
                    const followedIds = response.data.map(user => user.id); // guardamos solo los ids
                    setFollowedUsers(followedIds);
                }
            } catch (error) {
                console.error("Error fetching followed users:", error);
            }
        };

        fetchFollowedUsers();
    }, []);

    return (
        <div className="home-container">
            <div className="top-bar">
                <div>
                    <LogoutButton/>
                </div>
                <div>
                    <Navbar/>
                </div>
                <div>
                    <SearchUserBar handleSearch={handleSearch}/>
                    {/*Muestro una ventana con los usuarios si escribo en la searchbar*/}
                    {users.length > 0 && (
                        <div className="search-results-container">
                            {users.map(user => (
                                <div className="search-result-item" key={user.id}>
                                    <img src={user.profilePicture} alt="profilePicture" width="40px" height="40px" />
                                    <h2>{user.username}</h2>
                                    <Button
                                        onClick={() => {
                                            if (followedUsers.includes(user.id)) {
                                                handleUnfollow(user.id);
                                            } else {
                                                handleFollow(user.id);
                                            }
                                        }}
                                        type="submit"
                                        className="btn-primary"
                                        text={followedUsers.includes(user.id) ? "Unfollow" : "Follow"}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="main-container">
                <section className="left-section">
                    <h1>izq</h1>
                </section>
                <section className="center-section">
                    <h1>Posts de usuarios que sigo</h1>
                    {followingRecreationalPosts.length > 0 && (
                        followingRecreationalPosts.map((post) => (
                            <div className="post-container">
                                <div className="user-info">
                                    <img
                                        src={post.usuario.profilePicture}
                                        alt="Foto de perfil"
                                        className="profile-picture"
                                    />
                                    <h2 className="username">{post.username}</h2>
                                </div>
                                <RecreationalPost key={post.idRecPost} post={post}/>
                            </div>
                        ))
                    )}
                    {followingTrainingPlanPosts.length > 0 && (
                        followingTrainingPlanPosts.map((post) => (
                            <TrainingPlanPost key={post.idTrainPost} post={post} />
                        ))
                    )}

                </section>
                <section className="right-section">
                    <h1>right</h1>
                </section>

            </div>
        </div>
    )
}

export default Home;