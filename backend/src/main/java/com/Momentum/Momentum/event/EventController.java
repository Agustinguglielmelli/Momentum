package com.Momentum.Momentum.event;

import com.Momentum.Momentum.email.EmailService;
import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioDto;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import org.hibernate.event.spi.EventManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
public class EventController {

    @Autowired
    UsuarioRepository repository;

    @Autowired
    private EventService eventService;
    
    @Autowired
    private EmailService emailService;

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authentication principal: " + authentication.getPrincipal().getClass());

        return (Usuario) authentication.getPrincipal();  // Devuelve el usuario autenticado
    }
    @PostMapping("/events")
    public Event createEvent(@RequestBody Event event, @ModelAttribute("currentUser") Usuario currentUser) {
        return eventService.createEvent(event, currentUser);
    }
    @DeleteMapping("/events/{event_id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long event_id, @ModelAttribute("currentUser") Usuario currentUser) {
        try {
            eventService.deleteEventById(event_id);
            return ResponseEntity.ok("Evento eliminado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el evento: " + e.getMessage());
        }
    }

    @PostMapping("/events/mail")
    public ResponseEntity<String> verifyDateAndSendMail(@ModelAttribute("currentUser") Usuario currentUser) {
        List<Event> joinedEvents = eventService.findJoinedEvents(currentUser.getId());
        List<Event> eventsToNotify = joinedEvents.stream()
                .filter(event -> {
                    try {
                        LocalDate eventDate = LocalDate.parse(event.getDate());
                        return eventDate.equals(LocalDate.now().plusDays(1));
                    } catch (Exception e) {
                        return false;
                    }
                })
                .toList();
        String subject = "Recordatorio de eventos próximos";
        String text = "Hola " + currentUser.getUsername() + ",\n\n" +
                "Recuerda que quedan menos de 24hs para los siguientes eventos!:\n\n" +
                eventsToNotify.stream()
                    .map(e -> "- " + e.getTitle() + " el " + e.getDate())
                    .collect(Collectors.joining("\n"));

        try {
            emailService.sendSimpleEmail(currentUser.getUsername(), subject, text);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar el correo: " + e.getMessage());
        }
        return ResponseEntity.ok("Mail enviado");
    }

    @GetMapping("/event/search")
    public List<EventDto> getEventsByName(@RequestParam String nameSearch){
        List<Event> users = eventService.searchEvents(nameSearch);
        return users.stream().map(
                u -> new EventDto(
                        u.getTitle(),
                        u.getDate(),
                        u.getIdEvent()
                )
        ).collect(Collectors.toList());
    }


    @DeleteMapping("events/{event_id}/participants")
    public ResponseEntity<String> deleteParticipantsFromEvent(@PathVariable Long event_id,
     @ModelAttribute("currentUser") Usuario currentUser){
        try{
            eventService.deleteParticipantsById(event_id);
            return ResponseEntity.ok("Participantes eliminados");

        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar participantes: " + e.getMessage());
        }
     }

    @PutMapping("/events/{event_id}")
    public ResponseEntity<Event> modificarRecPost(@PathVariable long event_id, @RequestBody Event newEvent,
                                               @ModelAttribute("currentUser") Usuario currentUser) {

        Optional<Event> post = eventService.getEventById(event_id);

        if (post.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Event existente = post.get();

        if (existente.getCreador() == null || existente.getCreador().getId() != currentUser.getId()) {
            return ResponseEntity.status(403).build(); // 403 Forbidden
        }

        if (newEvent.getTitle() != null && !newEvent.getTitle().isEmpty()) {
            existente.setTitle(newEvent.getTitle());
        }
        if (newEvent.getDescription() != null && !newEvent.getDescription().isEmpty()) {
            existente.setDescription(newEvent.getDescription());
        }
        if (newEvent.getStartAtPlace() != null && !newEvent.getStartAtPlace().isEmpty()) {
            existente.setStartAtPlace(newEvent.getStartAtPlace());
        }
        if (newEvent.getEndAtPlace() != null && !newEvent.getEndAtPlace().isEmpty()) {
            existente.setEndAtPlace(newEvent.getEndAtPlace());
        }
        if (newEvent.getDate() != null && !newEvent.getDate().isEmpty()) {
            existente.setDate(newEvent.getDate());
        }
        if (newEvent.getKmToRun() != null && !newEvent.getKmToRun().isEmpty()) {
            existente.setKmToRun(newEvent.getKmToRun());
        }

        Event nuevoEvent = eventService.updateEvent(existente);

        return ResponseEntity.ok(nuevoEvent);
    }


    @GetMapping("/events")
    public List<Event> getAllEvents(@ModelAttribute("currentUser") Usuario currentUser) {
        return eventService.listAllEvents();
    }
    @GetMapping("/events/{event_id}")
        public ResponseEntity<Event> getEventById(@PathVariable Long event_id, @ModelAttribute("currentUser") Usuario currentUser) {
        Optional<Event> event = eventService.getEventById(event_id);
        if (event.isPresent()) {
            return ResponseEntity.ok(event.get());
        } else {
            return ResponseEntity.notFound().build();
        }
}

    @GetMapping("/joinedEvents")
    public List<Event> getJoinedEvents(@ModelAttribute("currentUser") Usuario currentUser) {
        return eventService.findJoinedEvents(currentUser.getId());
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
                p.getProfilePicture(),
                p.displayUserName())
        ).collect(Collectors.toSet());
        return ResponseEntity.ok(dtoParticipants);
    }

    @DeleteMapping("/events/unjoin/{event_id}")
    public ResponseEntity<?> unJoinEvent(@PathVariable long event_id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        Optional<Usuario> currentUserOpt = repository.findByEmail(userEmail);

        if (currentUserOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no autenticado");
        }

        Usuario currentUser = currentUserOpt.get();

        try{
            eventService.unjoinEvent(event_id, currentUser);
            return ResponseEntity.ok().build();
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error unjoining event");
        }
    }
}




