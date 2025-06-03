package com.Momentum.Momentum.conversation.rest;

import com.Momentum.Momentum.conversation.ConversationDto;
import com.Momentum.Momentum.conversation.ConversationRepository;
import com.Momentum.Momentum.conversation.ConversationService;
import com.Momentum.Momentum.message.MessageDTO;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/conversations")
public class ConversationControllerRest {

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser(org.springframework.security.core.Authentication authentication) {
        return (Usuario) authentication.getPrincipal();
    }

    @PostMapping("/create/{user2id}")
    public ConversationDto createConversation(
            @ModelAttribute("currentUser") Usuario currentUser,
            @PathVariable Long user2id
    ) {
        Optional<Usuario> user = usuarioRepository.findById(user2id);
        if (!user.isPresent()) {
            throw new IllegalArgumentException("No existe el usuario con el id: " + user2id);
        }
        return conversationService.createConversation(currentUser.getId(), user2id);
    }

    
    @GetMapping("/{user2id}")
    public ResponseEntity<ConversationDto> getConversationWithUser(@ModelAttribute("currentUser") Usuario currentUser, @PathVariable Long user2id) {
        return conversationService.getConversationBetween(currentUser, user2id);
    }

    @GetMapping("/allMyConversations")
    public List<ConversationDto> getAllConversations(@ModelAttribute("currentUser") Usuario currentUser) {
        return conversationService.findAllMyConversations(currentUser);
    }
    @GetMapping("/conversation/{id}")
    public ResponseEntity<ConversationDto> getConversationById(@PathVariable Long id) {
        return conversationService.getConversationById(id);
    }

    @GetMapping("/{id}/messages")
    public ResponseEntity<List<MessageDTO>> getMessagesByConversationId(@PathVariable Long id) {
        return conversationService.getMessagesByConversationId(id);
    }

    /*@GetMapping("/{id}")
    public Optional<Conversation> getConversationById(@PathVariable Long id) {
        return conversationService.getById(id);
    }*/
}
