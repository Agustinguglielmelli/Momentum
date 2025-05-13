package com.Momentum.Momentum.conversation.rest;

import com.Momentum.Momentum.conversation.ConversationDto;
import com.Momentum.Momentum.conversation.ConversationService;
import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/conversations")
public class ConversationControllerRest {

    @Autowired
    private ConversationService conversationService;

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser(org.springframework.security.core.Authentication authentication) {
        return (Usuario) authentication.getPrincipal();
    }

    @PostMapping("/create/{user2id}")
    public ConversationDto createConversation(
            @ModelAttribute("currentUser") Usuario currentUser,
            @PathVariable Long user2id
    ) {
        return conversationService.createConversation(currentUser.getId(), user2id);
    }

    
    @GetMapping("/{user2id}")
    public ResponseEntity<ConversationDto> getConversationWithUser(@ModelAttribute("currentUser") Usuario currentUser, @PathVariable Long user2id) {
        return conversationService.getConversationBetween(currentUser, user2id);
    }

    @GetMapping("/")
    public List<ConversationDto> getAllConversations(@ModelAttribute("currentUser") Usuario currentUser) {
        return conversationService.findAllMyConversations(currentUser);
    }

    /*@GetMapping("/{id}")
    public Optional<Conversation> getConversationById(@PathVariable Long id) {
        return conversationService.getById(id);
    }*/
}
