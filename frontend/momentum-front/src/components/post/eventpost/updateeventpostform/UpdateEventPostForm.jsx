
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

export default function UpdateEventForm() {
  const { event_id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    startAtPlace: '',
    endAtPlace: '',
    date: '',
    kmToRun: '',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log(event_id);
        const response = await axios.get(`http://localhost:8080/events/${event_id}`, {
            
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        setEventData(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [event_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/events/${event_id}`, eventData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/events"); 
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="w-50 mx-auto border p-5 shadow bg-body-secondary border-light-secondary rounded-lg">
      <h2>Update Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={eventData.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={eventData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="startAtPlace"
          placeholder="Start Place"
          value={eventData.startAtPlace}
          onChange={handleChange}
        />
        <input
          type="text"
          name="endAtPlace"
          placeholder="End Place"
          value={eventData.endAtPlace}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="kmToRun"
          placeholder="Kilometers to Run"
          value={eventData.kmToRun}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-success">Save Changes</button>
      </form>
    </div>
  );
}
