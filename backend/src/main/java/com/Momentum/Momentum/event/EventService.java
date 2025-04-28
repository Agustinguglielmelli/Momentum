package com.Momentum.Momentum.event;


import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}

