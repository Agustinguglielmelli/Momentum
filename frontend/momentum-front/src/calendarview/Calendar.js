// Calendar.jsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {useState} from "react";
import './CalendarCss.css';

function Calendar({events}){
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleClick = (info) => {
        const event = info.event;
        const selected ={
            title: event.title,
            date: event.start.toLocaleString(),
            description: event.extendedProps.description,
            lugar: event.extendedProps.startAtPlace,
            km: event.extendedProps.kmToRun,
            participantes: event.extendedProps.participantsCount
        };

        console.log(selected);
        setSelectedEvent(selected);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    }

    return (
        <div className="calendar-wrapper">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleClick}
            />

            {selectedEvent && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                        <div className="modal-header">
                            <h2 className="modal-title">
                                {selectedEvent.title || "Evento de Running"}
                            </h2>
                            <button className="close-button" onClick={closeModal}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="event-info">

                                <div className="info-item">
                                    <div className="info-icon">📅</div>
                                    <div className="info-content">
                                        <div className="info-label">Fecha</div>
                                        <p className="info-value">
                                            {selectedEvent.date || "Fecha por confirmar"}
                                        </p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">📍</div>
                                    <div className="info-content">
                                        <div className="info-label">Lugar de Inicio</div>
                                        <p className="info-value">
                                            {selectedEvent.lugar || "Lugar por confirmar"}
                                        </p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">🏃‍♂️</div>
                                    <div className="info-content">
                                        <div className="info-label">Distancia</div>
                                        <p className="info-value">
                                            {selectedEvent.km ? `${selectedEvent.km} km` : "Distancia por confirmar"}
                                        </p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">👥</div>
                                    <div className="info-content">
                                        <div className="info-label">Participantes</div>
                                        <p className="info-value">
                                            {selectedEvent.participantes !== undefined
                                                ? <span className="participants-badge">{selectedEvent.participantes} runners</span>
                                                : "Número por confirmar"
                                            }
                                        </p>
                                    </div>
                                </div>

                                {selectedEvent.description && (
                                    <div className="info-item">
                                        <div className="info-icon">📝</div>
                                        <div className="info-content">
                                            <div className="info-label">Descripción</div>
                                            <p className="info-value">
                                                {selectedEvent.description}
                                            </p>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="close-modal-button" onClick={closeModal}>
                                Cerrar
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default Calendar;