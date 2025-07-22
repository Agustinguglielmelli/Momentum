import Calendar from "./Calendar";
import React, {useEffect, useState} from "react";
import {listJoinedEvents} from "../../api/functions";
import {Link} from "react-router-dom";
function CalendarPage() {
    const [joinedEvents, setJoinedEvents] = useState([]);

    useEffect(() => {
        const fetchJoinedEvents = async () => {
            try {
                const response = await listJoinedEvents();
                const data = response.data;

                const formattedEvents = data.map(event => ({
                    id: event.idEvent,
                    title: event.title,
                    start: event.date,
                    extendedProps: {
                        description: event.description,
                        startAtPlace: event.startAtPlace,
                        endAtPlace: event.endAtPlace,
                        kmToRun: event.kmToRun,
                        participantsCount: event.participantsCount
                    }
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
        <Link to={"/events"} className="btn btn-primary">Back</Link>
        <Calendar events={joinedEvents}></Calendar>
    </div>
  );
}
export default CalendarPage;