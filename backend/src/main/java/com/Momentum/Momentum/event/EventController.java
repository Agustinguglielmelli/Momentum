package com.Momentum.Momentum.event;

import com.Momentum.Momentum.usuario.Usuario;
//import com.Momentum.Momentum.usuario.UsuarioController;
//import com.Momentum.Momentum.event.EventService;
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
    private EventService eventService;

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();  // Devuelve el usuario autenticado
    }

    /*@GetMapping("/events/myevents")
    public List<Event> getAllEvents(@ModelAttribute("currentUser") Usuario currentUser){
        return eventService.listEventsOfUser(currentUser.getId());
    }*/

    @PostMapping("/events/myevents")
    public Event createEventPost(@RequestBody Event event, @ModelAttribute("currentUser") Usuario currentUser) {
        event.setCreadorDeEvento(currentUser); // Asignás al creador
        event.getParticipants().add(currentUser);
        return eventService.createEvent(event);
    }

    @GetMapping("/events/myevents/{id}")
    public Optional<Event> getEventsById(@PathVariable Long id) {
       return eventService.getEventById(id);
    }

   /*  @DeleteMapping("/events/myevents/{id}")
    public ResponseEntity<Void> deleteEventsById(@PathVariable long id, @ModelAttribute("currentUser") Usuario currentUser) {
        Optional<Event> optional = eventService.getEventById(id);
        if (optional.isEmpty() || optional.get().getUsuario().getId() != currentUser.getId()) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        eventService.deleteEventById(id);
        return ResponseEntity.ok().build();
    }*/
    @DeleteMapping("/events/myevents/{id}")
public ResponseEntity<Void> deleteEventsById(@PathVariable long id, @ModelAttribute("currentUser") Usuario currentUser) {
    Optional<Event> optional = eventService.getEventById(id);
    if (optional.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    Event evento = optional.get();

    if (evento.getCreadorDeEvento().getId() != currentUser.getId()) {
        return ResponseEntity.status(403).build(); // Solo el creador puede eliminar un evento
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
    }

    Event existente = optionalExisting.get();

    // Solo el creador puede modificar el evento
    if (existente.getCreadorDeEvento() == null || 
        existente.getCreadorDeEvento().getId() != currentUser.getId()) {
        return ResponseEntity.status(403).build(); 
    }

   
    existente.setDescription(newEvent.getDescription());
    existente.setStartAtPlace(newEvent.getStartAtPlace());
    existente.setEndAtPlace(newEvent.getEndAtPlace());
    existente.setTitle(newEvent.getTitle());
    existente.setDate(newEvent.getDate());
    existente.setKmToRun(newEvent.getKmToRun());

    Event updated = eventService.modifyEvent(existente);
    return ResponseEntity.ok(updated);
}

}




