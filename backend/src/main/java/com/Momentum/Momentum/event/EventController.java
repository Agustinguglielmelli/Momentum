package com.Momentum.Momentum.event;

import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioDto;
import org.hibernate.event.spi.EventManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
public class EventController {

    @Autowired
    private EventService eventService;

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();  // Devuelve el usuario autenticado
    }
    @PreAuthorize("hasAuthority('COACH')")
    @PostMapping("/events")
    public Event createEvent(@RequestBody Event event, @ModelAttribute("currentUser") Usuario currentUser) {
        return eventService.createEvent(event, currentUser);
    }

    @GetMapping("/events")
    public List<Event> getAllEvents(@ModelAttribute("currentUser") Usuario currentUser) {
        return eventService.listAllEvents();
    }

    @PostMapping("/events/{event_id}/participants")
    public ResponseEntity<String> addParticipant(@PathVariable Long event_id,
                                                 @ModelAttribute("currentUser") Usuario currentUser) {
        Optional<Event> optionalEvent = eventService.getEventById(event_id);
        if (optionalEvent.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Event event = optionalEvent.get();
        event.getParticipantes().add(currentUser);
        eventService.addParticipant(event);
        return new ResponseEntity<>("Event added", HttpStatus.OK);
    }

    @GetMapping("/events/{event_id}/participants")
    public ResponseEntity<Set<UsuarioDto>> getParticipants(@PathVariable Long event_id,
            @ModelAttribute("currentUser") Usuario currentUser) {
        Optional<Event> optionalEvent = eventService.getEventById(event_id);
        if (optionalEvent.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Event event = optionalEvent.get();
        Set<Usuario> participants = event.getParticipantes();
        Set<UsuarioDto> dtoParticipants = participants.stream().map( p -> new UsuarioDto(
                p.getUsername(),
                p.getId(),
                p.getProfilePicture())
        ).collect(Collectors.toSet());
        return ResponseEntity.ok(dtoParticipants);
    }

    @DeleteMapping("events/unjoin/{event_id}")
    public ResponseEntity<?> unJoinEvent(@ModelAttribute("currentUser") Usuario currentUser, 
                                        @PathVariable long event_id){
        try{
            eventService.unjoinEvent(event_id, currentUser);
            return ResponseEntity.ok().build();
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error unjoining event");
        }
    }



}




