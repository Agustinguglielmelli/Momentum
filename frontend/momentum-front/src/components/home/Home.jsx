import LogoutButton from "../logoutbutton/LogoutButton";
import Navbar from "../navbar/Navbar";
import SearchBar from "../searchbar/SearchBar";
import "./HomeCss.css"
import {useEffect, useState} from "react";
import {
    listFollowingRecreationalPosts,
    listFollowingTrainingPlansPosts,
    listUsersByNameSearch
} from "../../api/functions";
import {RecreationalPost} from "../post/recreationalpost/RecreationalPost";
import {TrainingPlanPost} from "../post/trainingplanpost/TrainingPlanPost";
import axios from "axios";
import {AiFillBug} from "react-icons/ai";
import Button from "../button/Button";


function Home(){
    const [followingRecreationalPosts, setFollowingRecreationlPosts] = useState([]);
    const [followingTrainingPlanPosts,setfollowingTrainingPlanPosts ] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    const [users, setUsers] = useState([]);

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
                setFollowingRecreationlPosts(posts);
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
                setfollowingTrainingPlanPosts(posts);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFollowingTrainingPlanPosts();
    }, []);

    let handleFollow;
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
                    <SearchBar handleSearch={handleSearch}/>
                    {/*Muestro una ventana con los usuarios si escribo en la searchbar*/}
                    {users.length > 0 && (
                        <div className="search-results-container">
                            {users.map(user => (
                                <div className="search-result-item" key={user.id}>
                                    <img src={user.profilePicture} alt="profilePicture" width="40px" height="40px" />
                                    <h2>{user.username}</h2>
                                    <Button onClick={handleFollow} className="btn-primary" text="Follow" />
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
                                <RecreationalPost key={post.idRecPost} post={post} />
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