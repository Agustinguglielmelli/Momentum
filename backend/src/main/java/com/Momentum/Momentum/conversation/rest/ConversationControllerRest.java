package com.Momentum.Momentum.conversation.rest;

import com.Momentum.Momentum.conversation.Conversation;
import com.Momentum.Momentum.conversation.ConversationDTO;
import com.Momentum.Momentum.conversation.ConversationFullDTO;
import com.Momentum.Momentum.conversation.ConversationService;
import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PostMapping("/create")
    public ConversationDTO createConversation(
            @ModelAttribute("currentUser") Usuario currentUser,
            @RequestParam Long receiverId
    ) {
        Conversation conversation = conversationService.createConversation(currentUser.getId(), receiverId);

        return new ConversationDTO(
                conversation.getId(),
                currentUser.getId(),
                receiverId,
                conversation.getLastUpdated()
        );
    }

    
    @GetMapping("/")
    public List<ConversationFullDTO> getMyConversations(@ModelAttribute("currentUser") Usuario currentUser) {
        return conversationService.getUserConversationDTOs(currentUser.getId());
    }
  
    @GetMapping("/{id}")
    public Optional<Conversation> getConversationById(@PathVariable Long id) {
        return conversationService.getById(id);
    }
}
