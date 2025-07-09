import Calendar from "./Calendar";
import {useEffect, useState} from "react";
import {listJoinedEvents} from "../api/functions";
function CalendarPage() {
    const [joinedEvents, setJoinedEvents] = useState([]);

    useEffect(() => {
        const fetchJoinedEvents = async () => {
            try {
                const response = await listJoinedEvents();
                const data = response.data;

                const formattedEvents = data.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: event.date
                }));

                setJoinedEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching joined events:', error);
            }
        };

        fetchJoinedEvents();
    }, []);


  return (
    <div>
        <Calendar events={joinedEvents}></Calendar>
    </div>
  );
}
export default CalendarPage;