import LogoutButton from "../logoutbutton/LogoutButton";
import Navbar from "../navbar/Navbar";
import SearchBar from "../searchbar/SearchBar";
import "./HomeCss.css"
import {useEffect, useState} from "react";
import {listFollowingPosts} from "../../api/functions";
import {RecreationalPost} from "../post/recreationalpost/RecreationalPost";

function Home(){
    const [followingPosts, setFollowingPosts] = useState([]);

    useEffect(() => {
        const fetchFollowingPosts = async () => {
            try {
                const posts = await listFollowingPosts();
                console.log(posts);
                setFollowingPosts(posts);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFollowingPosts();
    }, []);
    return (
        <div className="home-container">
            <div className="top-bar">
                <div className="left">
                    <LogoutButton/>
                </div>
                <div className="center">
                    <Navbar/>
                </div>
                <div className="right">
                    <SearchBar/>
                </div> {/*hay que acomodar bien esto*/}
            </div> {/* en topbar dejamos esto y toddo lo demas creamos un div abajo de este (main-container)*/}
            <div className="main-container">
                <section className="left-section">
                    <h1>izq</h1>
                </section>
                <section className="center-section">
                    <h1>Posts de usuarios que sigo</h1>

                    {followingPosts.map((post) => (
                        <RecreationalPost key={post.idRecPost} post={post} />
                    ))}
                </section>
                <section className="right-section">
                    <h1>right</h1>
                </section>

            </div>
        </div>
    )
}

export default Home;