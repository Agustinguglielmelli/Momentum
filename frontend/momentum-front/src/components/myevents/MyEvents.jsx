
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  listEventPosts, getUserRole, unJoin, listJoinedEventPosts,
  joinEvent, deleteEvent, deleteParticipantsFromEvent, listUsersByNameSearch, listEventsByNameSearch
} from "../../api/functions";
import { EventPostRunner } from "../post/eventpost/EventPostRunner";
import { Link } from "react-router-dom";
import "./MyEvents.css";
import VerticalDivider from "../divider/Divider";
import SearchEventBar from "../searchbar/SearchEventBar";
import {EventPostCoach} from "../post/eventpost/EventPostCoach";
import Navbar from "../navbar/Navbar";
import Button from "../button/Button";
import MapForEvents from "../mapforevents/MapForEvents";

function MyEvents() {
  const [userRole, setUserRole] = useState(null);
  const [allEventPosts, setAllEventPosts] = useState([]);
  const [joinedEventPosts, setJoinedEventPosts] = useState([]);
  const [eventSearch, setEventSearch] = useState("");
  const [event, setEvent] = useState([]);




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
  
  const handleDelete = async (idEvent) => {
    try{
        await deleteParticipantsFromEvent(idEvent);
        // Primero elimino los participantes, despues el evento
        await deleteEvent(idEvent);

        // Actualizás el estado para que desaparezca el post de la pantalla
        setAllEventPosts(prevPosts => prevPosts.filter(post => post.idEvent !== idEvent));
    } catch(error){
      console.error('Error when deleting event and participants',error);
    }
  }
  const navigate = useNavigate();
  const handleUpdate = async (idEvent) => {
    try{
      navigate(`/update-event/${idEvent}`);

    } catch(error){
      console.error('error when updating event',error);
    }
  }


  const handleSearch = async (event) => {
    setEventSearch(event.target.value);
    if (event.target.value.trim() === "") {
      setEvent([]); // Si el campo de búsqueda está vacío, limpia los resultados
    } else {
      try {
        const response = await listEventsByNameSearch(event.target.value);
        console.log("Full response:", response);
        console.log("Response data:", response.data);  // Verifica la respuesta completa

        if (Array.isArray(response.data)) {
          setEvent(response.data); // Solo actualizar si la respuesta es un array
        } else {
          console.error('Error: La respuesta no es un array:', response.data);
          setEvent([]); // Limpiar si no es un array
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

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
                  <Link className="btn btn-warning" to={"/events/searchEvent"}>
                    Search Event
                  </Link>
                  <h2 className="section-title">Events I'll Go</h2>
                  {joinedEventPosts.map((post) => (
                      <EventPostRunner key={post.idEvent} post={post} actionType="unjoin" handleAction={handleUnJoin}/>
                  ))}
                </section>

                <VerticalDivider/>

                <section className="profile-right">
                  <h2 className="section-title">Search Events</h2>
                  <SearchEventBar handleSearch={handleSearch}/>
                  {event.length > 0 && (
                      <div className="search-results-container">
                        {event.map(ev => (
                            <div className="search-result-item" key={ev.idEvent}>
                              <h2>{ev.title}</h2>
                              <h2>{ev.date}</h2>
                              <Button text="Join event" className="btn-secondary"
                                      onClick={() => handleJoin(ev.idEvent)}></Button>
                            </div>
                        ))}
                      </div>
                  )}
                  {availableEventPosts.map((post) => (
                      <EventPostRunner key={post.idEvent} post={post} actionType="join" handleAction={handleJoin}/>
                  ))}
                </section>
              </div>
          )}

          {userRole === "COACH" && (
              <div className="profile-content">
                <section className="profile-left">
                <Link className="btn btn-warning" to={"/events/searchEvent"}>
                    Search Event
                </Link>
                  <h2 className="section-title">My Events</h2>
                  <div className="event-list">
                    {allEventPosts.map(post => (
                        <EventPostCoach
                            key={post.idEvent}
                            post={post}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}/>
                    ))}
                  </div>
                </section>
                <VerticalDivider/>
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
