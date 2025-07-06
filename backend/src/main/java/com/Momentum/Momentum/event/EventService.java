package com.Momentum.Momentum.event;


import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
public class EventService {

    EventRepository eventRepository;
    UsuarioRepository userRepository;

    @Autowired
    public EventService(EventRepository eventRepository, UsuarioRepository userRespository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> findJoinedEvents(Long id){
        return eventRepository.findByParticipantes_Id(id);
    }

    public Event createEvent(Event event, Usuario currentUser) {
        event.setCreador(currentUser);
        return eventRepository.save(event);
    }
    public void deleteEventById(Long eventId) {
        Event event = eventRepository.findByIdEvent(eventId);

        for (Usuario participant : event.getParticipantes()) {
            participant.getEventsImIn().remove(event); // los borro los participantes del evento antes de eliminarlo
        }
        eventRepository.deleteById(eventId);
    }
    @Transactional
    public Event deleteParticipantsById(Long event_id) {
        Optional<Event> optionalEvent = eventRepository.findById(event_id);

        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();

            // Suponiendo que el evento tiene una lista de participantes
            event.getParticipantes().clear(); // Elimina a todos los participantes del evento

            return eventRepository.save(event); // Guarda los cambios
        } else {
            throw new RuntimeException("Event not found with ID: " + event_id);
        }
    }
    public Event updateEvent(Event event){
        return eventRepository.save(event);
    }

    public List<Event> listAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long event_id) {
        return eventRepository.findById(event_id);
    }

    public Event addParticipant(Event event) {
        return eventRepository.save(event);
    }

    public void unjoinEvent(long eventId, Usuario currentUser) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);
        if (eventOptional.isEmpty()) {
            throw new RuntimeException("Event not found");
        }
    
        Event event = eventOptional.get();

        // Eliminar el currentUser de la lista de participantes
        if (event.getParticipantes().contains(currentUser)) {
            event.getParticipantes().remove(currentUser);
            eventRepository.save(event); // Guardamos los cambios
        } else {
            throw new RuntimeException("User is not a participant of the event");
        }
    }
    public List<Event> searchEvents(String nameSearch) {
        return eventRepository.findByTitleStartingWithIgnoreCase(nameSearch);
    }

    public List<Event> getEventsWithMostParticipants() {
        List<Event> events = eventRepository.findAll();
        events.sort((e1, e2) -> Integer.compare(e2.getParticipantes().size(), e1.getParticipantes().size()));
        return events.subList(0, 3);
    }
}

