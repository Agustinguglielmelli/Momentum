package com.Momentum.Momentum.event;

import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/events")
    public Event createEvent(@RequestBody Event event, @ModelAttribute("currentUser") Usuario currentUser) {
        return eventService.createEvent(event, currentUser);
    }

    @GetMapping("/events")
    public List<Event> getAllEvents(@ModelAttribute("currentUser") Usuario currentUser) {
        return eventService.listAllEvents();
    }


}




