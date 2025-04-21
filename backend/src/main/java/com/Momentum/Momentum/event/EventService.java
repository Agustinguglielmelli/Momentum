package com.Momentum.Momentum.event;


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

    public List<Event> listEventsOfUser(Long userId) {
        return eventRepository.findByUsuarioId(userId);
    }

    public Optional<Event> getEventById(Long id){
        return eventRepository.findById(id);
    }

    public void deleteEventById(Long id){
        eventRepository.deleteById(id);
    }
    public Event createEvent(Event event){
        return eventRepository.save(event);
    }
    public Event modifyEvent(Event event){
        return eventRepository.save(event);
    }
}

