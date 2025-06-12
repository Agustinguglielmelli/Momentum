
package com.Momentum.Momentum.like;

import com.Momentum.Momentum.event.Event;
import com.Momentum.Momentum.event.EventRepository;
import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.recreationalpost.RecreationalPostRepository;
import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/likes")
public class LikeController {
    private final LikeService likeService;

    @Autowired
    private RecreationalPostRepository recpostRepository;

    @Autowired
    private EventRepository eventRepository;

    public LikeController(LikeService likeService, RecreationalPostRepository recpostRepository) {
        this.likeService = likeService;
        this.recpostRepository = recpostRepository;
    }

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();  // Devuelve el usuario autenticado
    }

    @GetMapping("/has-liked/{postId}")
    public ResponseEntity<Boolean> hasUserLikedPost(
            @PathVariable Long postId,
            @ModelAttribute("currentUser") Usuario currentUser) {

        Optional<RecreationalPost> postOptional = recpostRepository.findById(postId);

        if (postOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        boolean hasLiked = likeService.hasUserLiked(currentUser, postOptional.get());
        return ResponseEntity.ok(hasLiked);
    }



    @PostMapping("/toggle/{postId}")
    public ResponseEntity<Void> toggleLike(
            @PathVariable Long postId,
            @ModelAttribute("currentUser") Usuario currentUser) {

        Optional<RecreationalPost> postOptional = recpostRepository.findById(postId);
        if (postOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        likeService.toggleLike(currentUser, postOptional.get());
        return ResponseEntity.ok().build();
    }


    @GetMapping("/count/{postId}")
    public ResponseEntity<Long> getLikeCount(@PathVariable Long postId) {
        Optional<RecreationalPost> postOptional = recpostRepository.findById(postId);

        if (postOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Long count = likeService.getLikeCount(postOptional.get());
        return ResponseEntity.ok(count);
    }
    // ---------------------------- Eventos ----------------------------
    @GetMapping("/event/has-liked/{eventId}")
    public ResponseEntity<Boolean> hasUserLikedEvent(
            @PathVariable Long eventId,
            @ModelAttribute("currentUser") Usuario currentUser) {

        Optional<Event> eventOptional = eventRepository.findById(eventId);

        if (eventOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        boolean hasLiked = likeService.hasUserLikedEvent(currentUser, eventOptional.get());
        return ResponseEntity.ok(hasLiked);
    }

    @PostMapping("/event/toggle/{eventId}")
    public ResponseEntity<Void> toggleEventLike(
            @PathVariable Long eventId,
            @ModelAttribute("currentUser") Usuario currentUser) {

        Optional<Event> eventOptional = eventRepository.findById(eventId);
        if (eventOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        likeService.toggleEventLike(currentUser, eventOptional.get());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/event/count/{eventId}")
    public ResponseEntity<Long> getEventLikeCount(@PathVariable Long eventId) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);

        if (eventOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Long count = likeService.getEventLikeCount(eventOptional.get());
        return ResponseEntity.ok(count);
    }
}
