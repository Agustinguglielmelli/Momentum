package com.Momentum.Momentum.event;

import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();  // Devuelve el usuario autenticado
    }

    @GetMapping("/events/myevents")
    public List<Event> getAllEvents(@ModelAttribute("currentUser") Usuario currentUser){
        return eventService.listEventsOfUser(currentUser.getId());
    }

    @PostMapping("/events/myevents")
    public Event createEventPost(@RequestBody Event event, @ModelAttribute("currentUser") Usuario currentUser) {
        event.setUsuario(currentUser);
        return eventService.createEvent(event);
    }

    @GetMapping("/events/myevents/{id}")
    public Optional<Events> getEventsById(@PathVariable Long id) {
       return eventService.getEventById(id);
    }

    @DeleteMapping("/events/myevents/{id}")
    public ResponseEntity<Void> deleteEventsById(@PathVariable long id, @ModelAttribute("currentUser") Usuario currentUser) {
        Optional<Event> optional = eventService.getEventById(id);
        if (optional.isEmpty() || optional.get().getUsuario().getId() != currentUser.getId()) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        eventService.deleteEventById(id);
        return ResponseEntity.ok().build();
    }
    @PutMapping("events/myevents/{id}")
    public ResponseEntity<Event> modificarEvent(@PathVariable long id, @RequestBody Event newEvent,
                                                                   @ModelAttribute("currentUser") Usuario currentUser) {

        Optional<Event> optionalExisting = eventService.getEventById(id);

        if (optionalExisting.isEmpty()) {
            return ResponseEntity.notFound().build();
        } // si no lo encuentra, entonces tira un error 404. Pero no va a lanzar una exception

        Event existente = optionalExisting.get();
        existente.setDescription(newEvent.getDescription());
        existente.setStartAtPlace(newEvent.getStartAtPlace());
        existente.setEndAtPlace(newEvent.getEndAtPlace());
        existente.setTitle(newEvent.getTitle());
        existente.setDate(newEvent.getDate());
        existente.setKmToRun(newEvent.getKmToRun())

        if (existente.getUsuario() == null || existente.getUsuario().getId() != currentUser.getId()) {
            return ResponseEntity.status(403).build(); // 403 Forbidden
        }

        Event updated = eventService.modifyEvent(existente);
        return ResponseEntity.ok(updated);
    }

}

}


