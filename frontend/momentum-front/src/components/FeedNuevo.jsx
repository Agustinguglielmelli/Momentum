import "./FeedNuevoCss.css"
import PostNuevo from "./PostNuevo";
import React, {useEffect, useState} from "react";
import {
    follow, listFollowedUsers,
    listFollowingRecreationalPosts,
    listFollowingTrainingPlansPosts, listProfileInfo,
    listUsersByNameSearch, unFollow
} from "../api/functions";
import {Link} from "react-router-dom";



function FeedNuevo(){

    const [followingRecreationalPosts, setFollowingRecreationalPosts] = useState([]);
    const [followingTrainingPlanPosts,setFollowingTrainingPlanPosts ] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);

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
        <div className="main-container">
            <div className="sidebar-left">
                {userProfile && (
                    <div className="profile-card">
                    <div>
                        <img className="profile-pic" src={userProfile.profilePicture} alt=""/>
                    </div>
                    <h3>{userProfile.displayUserName}</h3>
                    <p>{userProfile.username}</p>
                    <div className="stats">
                        <div className="stat-item">
                            <div className="stat-value">128</div>
                            <div className="stat-label">Carreras</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">45</div>
                            <div className="stat-label">Seguidores</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">38</div>
                            <div className="stat-label">Siguiendo</div>
                        </div>
                    </div>
                </div>
                )}

                <ul className="menu-list">
                    <li><a href="#"><span>🏠</span> Inicio</a></li>
                    <li><Link to="/leaderboard-kms">🏆 Leaderboards</Link></li>
                    <li><Link to="/events">📅 Events</Link></li>
                    <li><Link to="/events">👤 My Profile</Link></li>
                    <li><a href="#"><span>👥</span> Comunidad</a></li>
                    <li><a href="#"><span>⚙️</span> Ajustes</a></li>
                </ul>
            </div>

            <div className="feed">
                <div className="create-post">
                    <div className="post-input">
                        <div className="post-avatar">👤</div>
                        <textarea className="post-textarea" placeholder="¿Cómo fue tu carrera hoy?"></textarea>
                    </div>
                    <div className="post-actions">
                        <div className="post-attachments">
                            <button className="attach-btn"><span>📷</span> Foto</button>
                            <button className="attach-btn"><span>📍</span> Ubicación</button>
                            <button className="attach-btn"><span>📊</span> Estadísticas</button>
                        </div>
                        <button className="submit-post">Publicar</button>
                    </div>
                </div>
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
                    <div className="trending-item">
                        <div className="trending-tag">#MaratonCiudad2025</div>
                        <div className="trending-stats">1.2K publicaciones esta semana</div>
                    </div>
                    <div className="trending-item">
                        <div className="trending-tag">#TécnicaDeCarrera</div>
                        <div className="trending-stats">845 publicaciones esta semana</div>
                    </div>
                    <div className="trending-item">
                        <div className="trending-tag">#CorrerEnInvierno</div>
                        <div className="trending-stats">621 publicaciones esta semana</div>
                    </div>
                </div>

                <div className="suggested-section">
                    <h3 className="section-title">Sugerencias para ti</h3>
                    <div className="suggested-user">
                        <div className="suggested-avatar">👤</div>
                        <div className="suggested-info">
                            <div className="suggested-name">Marta Ruiz</div>
                            <div className="suggested-stats">125 carreras registradas</div>
                        </div>
                        <button className="follow-btn">Seguir</button>
                    </div>
                    <div className="suggested-user">
                        <div className="suggested-avatar">👤</div>
                        <div className="suggested-info">
                            <div className="suggested-name">Club Trail Montaña</div>
                            <div className="suggested-stats">1.8K miembros</div>
                        </div>
                        <button className="follow-btn">Seguir</button>
                    </div>
                    <div className="suggested-user">
                        <div className="suggested-avatar">👤</div>
                        <div className="suggested-info">
                            <div className="suggested-name">Daniel Vega</div>
                            <div className="suggested-stats">89 carreras registradas</div>
                        </div>
                        <button className="follow-btn">Seguir</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedNuevo;