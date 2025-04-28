
import { useEffect, useState } from "react";
import {listEventPosts, getUserRole, unJoin, listJoinedEventPosts, joinEvent} from "../../api/functions";
import { EventPostRunner } from "../post/eventpost/EventPostRunner";
import { Link } from "react-router-dom";
import "./MyEvents.css";
import VerticalDivider from "../divider/Divider";
import SearchEventBar from "../searchbar/SearchEventBar";
import {EventPostCoach} from "../post/eventpost/EventPostCoach";
import Navbar from "../navbar/Navbar";

function MyEvents() {
  const [userRole, setUserRole] = useState(null);
  const [allEventPosts, setAllEventPosts] = useState([]);
  const [joinedEventPosts, setJoinedEventPosts] = useState([]);


  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, []);

  useEffect(() => {
    const fetchEventPost = async () => {
      try {
        const allEventPosts = await listEventPosts();
        console.log("Event Response:" + allEventPosts);
        setAllEventPosts(allEventPosts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEventPost();
  }, []);

  const handleUnJoin = async (eventId) => {
    setJoinedEventPosts(prevPosts => prevPosts.filter(post => post.idEvent !== eventId));
    try {
        const result = await unJoin(eventId);
        console.log("Saliste del evento");
      const updatedJoinedEvents = await listJoinedEventPosts();
      setJoinedEventPosts(updatedJoinedEvents);

    } catch (error) {
      console.log(error);
    }
  };
  const handleJoin = async (eventId) => {
    try {
      const result = await joinEvent(eventId);
      console.log("te uniste al evento")
      const updatedJoinedEvents = await listJoinedEventPosts();
      setJoinedEventPosts(updatedJoinedEvents);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchJoinedEventPost = async () => {
    try {
      const joinedEventPosts = await listJoinedEventPosts();
      console.log("Event Response:" + joinedEventPosts);
      setJoinedEventPosts(joinedEventPosts);
    } catch (error) {
      console.error(error);
    }
  };
  fetchJoinedEventPost();
}, []);

  const handleSearchEvent = async (eventId) => {

  }
  const availableEventPosts = allEventPosts.filter(post =>
      !joinedEventPosts.some(joinedPost => joinedPost.idEvent === post.idEvent)
  );
  return (
      <div>
        <Navbar/>
        <div className="profile-container">
          <h1 className="profile-title">WELCOME TO THE EVENTS {userRole}!!</h1>

          {userRole === "RUNNER" && (
            <div className="profile-content">

              <section className="profile-left">
                <h2 className="section-title">Events I'll Go</h2>
                {joinedEventPosts.map((post) => (
                    <EventPostRunner key={post.idEvent} post={post} actionType="unjoin" handleAction={handleUnJoin} />
                ))}
              </section>

              <VerticalDivider/>

              <section className="profile-right">
                <h2 className="section-title">Search Events</h2>
                <SearchEventBar handleSearch={handleSearchEvent} />
                {availableEventPosts.map((post) => (
                    <EventPostRunner key={post.idEvent} post={post} actionType="join" handleAction={handleJoin} />
                ))}
              </section>
            </div>
          )}

          {userRole === "COACH" && (
            <div className="profile-content">
              <section className="profile-left">
                <h2 className="section-title">My Events</h2>
                {allEventPosts.map((post) => (
                  <EventPostCoach key={post.idEvent} post={post} />
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
      </div>
  );
}

export default MyEvents;
