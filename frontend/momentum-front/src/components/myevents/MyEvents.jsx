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
import ButtonNuestro from "../button/ButtonNuestro";
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
      await deleteEvent(idEvent);
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
      setEvent([]);
    } else {
      try {
        const response = await listEventsByNameSearch(event.target.value);
        console.log("Full response:", response);
        console.log("Response data:", response.data);

        if (Array.isArray(response.data)) {
          setEvent(response.data);
        } else {
          console.error('Error: La respuesta no es un array:', response.data);
          setEvent([]);
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
      <div className="my-events-container">
        <Navbar/>

        <div className="events-main-container">
          {/* Header Section */}
          <div className="events-header">
            <div className="welcome-card">
              <div className="welcome-content">
                <h1 className="welcome-title">
                  <span className="welcome-emoji">🏃‍♂️</span>
                  Bienvenido a los Eventos
                </h1>
                <p className="welcome-subtitle">
                  {userRole === "RUNNER" ? "Descubre y únete a eventos increíbles" : "Administra tus eventos"}
                </p>
                <div className="role-badge">
                  <span className="role-icon">{userRole === "RUNNER" ? "🏃‍♂️" : "🏆"}</span>
                  {userRole}
                </div>
              </div>
            </div>
          </div>

          {userRole === "RUNNER" && (
              <div className="events-content-grid">
                {/* Left Section - My Events */}
                <div className="events-section">
                  <div className="section-header">
                    <h2 className="section-title">
                      <span className="section-icon">✅</span>
                      Mis Eventos
                    </h2>
                    <Link to='/eventsCalendar' className='calendar-button calendar-button-content'>Calendar View</Link>
                    <div className="events-count">{joinedEventPosts.length}</div>
                  </div>

                  <div className="events-list">
                    {joinedEventPosts.length > 0 ? (
                        joinedEventPosts.map((post) => (
                            <div key={post.idEvent} className="event-card-wrapper">
                              <EventPostRunner
                                  post={post}
                                  actionType="unjoin"
                                  handleAction={handleUnJoin}
                              />
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                          <div className="empty-icon">📅</div>
                          <h3>No tienes eventos aún</h3>
                          <p>Explora los eventos disponibles y únete a uno</p>
                        </div>
                    )}
                  </div>
                </div>

                {/* Right Section - Available Events */}
                <div className="events-section">
                  <div className="section-header">
                    <h2 className="section-title">
                      <span className="section-icon">🔍</span>
                      Explorar Eventos
                    </h2>
                  </div>

                  {/* Search Section */}
                  <div className="search-section">
                    <SearchEventBar handleSearch={handleSearch}/>

                    {event.length > 0 && (
                        <div className="search-results">
                          <h3 className="results-title">Resultados de búsqueda</h3>
                          <div className="search-results-grid">
                            {event.map(ev => (
                                <div className="search-result-card" key={ev.idEvent}>
                                  <div className="result-header">
                                    <h4 className="result-title">{ev.title}</h4>
                                    <span className="result-date">{ev.date}</span>
                                  </div>
                                  <ButtonNuestro
                                      text="Unirse al evento"
                                      className="btn-event-primary result-btn"
                                      onClick={() => handleJoin(ev.idEvent)}
                                  />
                                </div>
                            ))}
                          </div>
                        </div>
                    )}
                  </div>

                  {/* Available Events */}
                  <div className="available-events">
                    <h3 className="subsection-title">Eventos Disponibles</h3>
                    <div className="events-list">
                      {availableEventPosts.length > 0 ? (
                          availableEventPosts.map((post) => (
                              <div key={post.idEvent} className="event-card-wrapper">
                                <EventPostRunner
                                    post={post}
                                    actionType="join"
                                    handleAction={handleJoin}
                                />
                              </div>
                          ))
                      ) : (
                          <div className="empty-state">
                            <div className="empty-icon">🎯</div>
                            <h3>No hay eventos disponibles</h3>
                            <p>Vuelve más tarde para ver nuevos eventos</p>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          )}

          {userRole === "COACH" && (
              <div className="events-content-grid">
                {/* Left Section - My Events */}
                <div className="events-section">
                  <div className="section-header">
                    <h2 className="section-title">
                      <span className="section-icon">🏆</span>
                      Mis Eventos
                    </h2>
                    <div className="events-count">{allEventPosts.length}</div>
                  </div>

                  <div className="events-list">
                    {allEventPosts.length > 0 ? (
                        allEventPosts.map(post => (
                            <div key={post.idEvent} className="event-card-wrapper">
                              <EventPostCoach
                                  post={post}
                                  handleDelete={handleDelete}
                                  handleUpdate={handleUpdate}
                              />
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                          <div className="empty-icon">📝</div>
                          <h3>No has creado eventos aún</h3>
                          <p>Comienza creando tu primer evento</p>
                        </div>
                    )}
                  </div>
                </div>

                {/* Right Section - Create Events */}
                <div className="events-section">
                  <div className="section-header">
                    <h2 className="section-title">
                      <span className="section-icon">➕</span>
                      Crear Evento
                    </h2>
                  </div>

                  <div className="create-event-card">
                    <div className="create-content">
                      <div className="create-icon">🎯</div>
                      <h3>Organiza un nuevo evento</h3>
                      <p>Crea eventos increíbles para la comunidad de runners</p>
                      <Link className="create-event-btn" to={"/events/createEvent"}>
                        <span className="btn-icon">✨</span>
                        Crear Nuevo Evento
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}

export default MyEvents;