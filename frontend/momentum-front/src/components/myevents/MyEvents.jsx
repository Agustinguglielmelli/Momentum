import {useEffect, useState} from "react";
import {listEventPosts, getUserRole} from "../../api/functions";
import {EventPost} from "../post/eventpost/EventPost";
import {Link} from "react-router-dom";
import "./MyEvents.css"
import VerticalDivider from "../divider/Divider";
import SearchEventBar from "../searchbar/SearchEventBar";

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

    return (
        <div className="profile-container">
          <h1 className="profile-title">WELCOME TO THE EVENTS {userRole}!!</h1>
      
          {userRole === "RUNNER" && (
            <div className="profile-content">
              <h2 className="section-title">Events i'll go</h2>
              <section className="profile-left">
              {eventPosts.map((post) => (
                <EventPost key={post.idEvent} post={post} />
              ))}
              </section>

              <VerticalDivider/>

              <section className="profile-right">
              <h2 className="section-title">Search Events</h2>
                <SearchEventBar/>
              </section>
            </div> 
          )}
      
          {userRole === "COACH" && (
            <div className="profile-content">
              <section className="profile-left">
                <h2 className="section-title">My Events</h2>
                {eventPosts.map((post) => (
                  <EventPost key={post.idEvent} post={post} />
                ))}
              </section>
              <VerticalDivider />
              <section className="profile-right">
                <h2 className="section-title">Create New Events</h2>
                <Link className="btn btn-primary" to={"/events/createEvent"}>
                  New Event
                </Link>
              </section>
            </div>
          )}
        </div>
      );
    }      

export default MyEvents;