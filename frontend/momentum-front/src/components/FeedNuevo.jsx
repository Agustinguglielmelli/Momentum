import "./FeedNuevoCss.css"
import PostNuevo from "./PostNuevo";
import React, {useEffect, useState} from "react";
import {
    fetchMostPopularEvents, fetchMostPopularUsers,
    follow, listFollowedUsers,
    listFollowingRecreationalPosts,
    listFollowingTrainingPlansPosts, listProfileInfo,
    listUsersByNameSearch, unFollow
} from "../api/functions";
import {Link} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import SearchUserBar from "./searchbar/SearchUserBar";
import ButtonNuestro from "./button/ButtonNuestro";



function FeedNuevo(){

    const [followingRecreationalPosts, setFollowingRecreationalPosts] = useState([]);
    const [followingTrainingPlanPosts,setFollowingTrainingPlanPosts ] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [trendingEvents, setTrendingEvents] = useState([]); // Para los eventos populares
    const [trendingUsers, setTrendingUsers] = useState([]); // Para los usuarios populares

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

    // fucnion para buscar Eventos
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
        const fetchPopularEvents = async () => {
            try {
                const events = await fetchMostPopularEvents();
                setTrendingEvents(events)
            } catch (error) {
                console.error(error);
            }
        }
        const fetchPopularUsers = async () => {
            try {
                const users = await fetchMostPopularUsers();
                setTrendingUsers(users)
            } catch (error) {
                console.error(error);
            }
        }
        fetchPopularUsers();
        fetchPopularEvents()
        fetchFollowingRecreationalPosts();
    }, [followedUsers]);

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
    }, [followedUsers]);

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

    return(
        <div>
            <div>
                <Navbar searchBar={<SearchUserBar handleSearch={handleSearch}/>}/>
            </div>
            <div>
                {/*Muestro una ventana con los usuarios si escribo en la searchbar*/}
                {users.length > 0 && (
                    <div className="search-results-container">
                        {users.map(user => (
                            <div className="search-result-item" key={user.id}>
                                <img src={user.profilePicture} alt="profilePicture" className="profile-picture-search"/>
                                <h2>{user.displayUserName}</h2>
                                <ButtonNuestro
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
    <div className="main-container">
        <div className="sidebar-left">
            {userProfile && (
                <div className="profile-card">
                    <div>
                        <img className="profile-pic" src={userProfile.profilePicture} alt=""/>
                    </div>
                    <h3>{userProfile.displayUserName}</h3>
                    <p>{userProfile.username}</p>
                </div>
            )}

            <ul className="menu-list">
            <li><a href="#"><span>🏠</span> Inicio</a></li>
                        <li><Link to="/leaderboard-kms">🏆 Leaderboards</Link></li>
                        <li><Link to="/events">📅 Events</Link></li>
                        <li><Link to="/events">👤 My Profile</Link></li>
                    </ul>
                </div>

                <div className="feed">
                    {followingRecreationalPosts.length > 0 && (
                        followingRecreationalPosts.map((post) => (
                            <div className="post-container2">
                                <div className="post-content">
                                    <PostNuevo key={post.idRecPost} post={post}/>
                                </div>
                            </div>
                        ))
                    )}

                </div>

                <div className="sidebar-right">
                    <div className="trending-section">
                        <h3 className="section-title">Tendencias</h3>
                        {trendingEvents.map(event => (
                            <div className="trending-item" key={event.id}>
                                <div className="trending-tag">#{event.title}</div>
                                <div className="trending-stats">Participants: {event.participantsCount}</div>
                            </div>
                        ))}
                    </div>

                    <div className="suggested-section">
                        <h3 className="section-title">Sugerencias para ti</h3>
                        {trendingUsers.map(user => (
                            <div className="suggested-user" key={user.id}>
                                <div className="avatar">
                                    <img src={user.profilePicture} alt="Avatar" />
                                </div>
                                <div className="suggested-info">
                                    <div className="suggested-name">{user.displayUserName}</div>
                                    <div className="suggested-stats">{user.followersCount} seguidores</div>
                                </div>
                                {userProfile && user.id !== userProfile.id && (
                                    <button
                                        className="follow-btn"
                                        onClick={() => {
                                            if (followedUsers.includes(user.id)) {
                                                handleUnfollow(user.id);
                                            } else {
                                                handleFollow(user.id);
                                            }
                                        }}
                                    >
                                        {followedUsers.includes(user.id) ? "Dejar de seguir" : "Seguir"}
                                    </button>
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedNuevo;