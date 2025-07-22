// Calendar.jsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {useState, useRef} from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './CalendarCss.css';
import ButtonNuestro from "../button/ButtonNuestro";

function Calendar({events}){
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isExporting, setIsExporting] = useState(false);
    const calendarRef = useRef(null);

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

    const exportToPDF = async () => {
        if (!calendarRef.current) return;

        setIsExporting(true);

        try {
            // Configurar opciones para mejor calidad
            const canvas = await html2canvas(calendarRef.current, {
                scale: 2, // Mayor resolución
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                width: calendarRef.current.scrollWidth,
                height: calendarRef.current.scrollHeight,
            });

            const imgData = canvas.toDataURL('image/png');

            // Crear PDF en orientación horizontal para mejor ajuste
            const pdf = new jsPDF('landscape', 'mm', 'a4');

            // Calcular dimensiones para ajustar al PDF
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const finalWidth = imgWidth * ratio;
            const finalHeight = imgHeight * ratio;

            // Centrar la imagen en el PDF
            const x = (pdfWidth - finalWidth) / 2;
            const y = (pdfHeight - finalHeight) / 2;

            pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);

            // Obtener fecha actual para el nombre del archivo
            const currentDate = new Date().toLocaleDateString('es-ES').replace(/\//g, '-');
            pdf.save(`calendario-running-${currentDate}.pdf`);

        } catch (error) {
            console.error('Error al exportar PDF:', error);
            alert('Hubo un error al exportar el PDF. Por favor, inténtalo de nuevo.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="calendar-wrapper" ref={calendarRef}>
            <h1 className="calendar-title">Calendario de Eventos de Running</h1>
            {/* Botón de exportar PDF */}
            <div className="export-controls">
                <button
                    className="export-pdf-button"
                    onClick={exportToPDF}
                    disabled={isExporting}
                >
                    {isExporting ? (
                        <span className="export-loading">
                            <span className="spinner"></span>
                            Exportando...
                        </span>
                    ) : (
                        <span className="export-content">
                            📄 Exportar a PDF
                        </span>
                    )}
                </button>
            </div>

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