import {useEffect, useState} from "react";
import {listEventPosts, getUserRole} from "../../api/functions";
import {EventPost} from "../post/eventpost/EventPost";
import {Link} from "react-router-dom";
import "./MyEvents.css"
import VerticalDivider from "../divider/Divider";

function MyEvents(){

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const role = getUserRole();
        setUserRole(role);
    }, []);

    const [eventPosts, setEventPosts] = useState([]);

    useEffect( () => {
        const fetchEventPost = async () => {
            try {
                const eventPosts = await listEventPosts()
                console.log("Event Response:" + eventPosts)
                setEventPosts(eventPosts);

            } catch (error) {
                console.error(error);
            }
        }
        fetchEventPost();
    },[])

    return(
        <div className="profile-container">
            <h1 className="profile-title"> WELCOME TO THE EVENTS {userRole}!!</h1>
           

            {userRole === "RUNNER" && (
                <div className="profile-content">
                        <h2 className="section-title">My Events</h2>
    
                        {eventPosts.map((post) => (
                        <EventPost key={post.idEvent} post={post} />
                    ))}
                </div>
            )}
            
            <section className="left">
            {userRole === "COACH" && (
                <div className="profile-content">
                    <section className= "profile-left">
                    <h2 className="section-title">My Events</h2>
                    {eventPosts.map((post) => (
                        <EventPost key={post.idEvent} post={post} />
                    ))}
                    </section>
                    <VerticalDivider/>
                    <section className="profile-right">
                    <h2></h2>

                    <Link className="btn btn-primary" to={"/myevents/createEvent"}>
                        New Event
                    </Link>
                    
                    {eventPosts.map((post) => (
                        <EventPost key={post.idEvent} post={post} />
                    ))}
                    </section>
                </div>
            )}
            </section>
        </div>
    )





}

export default MyEvents;