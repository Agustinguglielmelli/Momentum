package com.Momentum.Momentum.event;


import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class EventService {

    EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }


    public Event createEvent(Event event, Usuario currentUser) {
        event.setCreador(currentUser);
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

}

