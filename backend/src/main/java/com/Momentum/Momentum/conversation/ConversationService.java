package com.Momentum.Momentum.conversation;

import com.Momentum.Momentum.message.MessageDTO;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioDto;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {
    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioDto toUsuarioDto(Usuario usuario) {
        return new UsuarioDto(
                usuario.getUsername(),
                usuario.getId(),
                usuario.getProfilePicture(),
                usuario.displayUserName()
        );
    }

    public ConversationDto toConversationDto(Conversation conversation) {
        UsuarioDto user1Dto = new UsuarioDto(
                conversation.getUser1().getUsername(),
                conversation.getUser1().getId(),
                conversation.getUser1().getProfilePicture(),
                conversation.getUser1().displayUserName()
        );

        UsuarioDto user2Dto = new UsuarioDto(
                conversation.getUser2().getUsername(),
                conversation.getUser2().getId(),
                conversation.getUser2().getProfilePicture(),
                conversation.getUser2().displayUserName()
        );

        List<MessageDTO> messageDTOs = conversation.getMessages().stream()
                .map(message -> new MessageDTO(
                        message.getContent(),
                        message.getTimestamp(),
                        toUsuarioDto(message.getSender()),
                        toUsuarioDto(message.getReceiver())
                ))
                .toList();

        return new ConversationDto(
                conversation.getId(),
                user1Dto,
                user2Dto,
                messageDTOs,
                conversation.getLastUpdated()
        );
    }


    @Transactional
    public ConversationDto createConversation(Long user1Id, Long user2Id) {
        if (user1Id.equals(user2Id)) {
            throw new IllegalArgumentException("No puedes crear una conversación contigo mismo.");
        }

        Usuario user1 = usuarioRepository.findById(user1Id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario 1 no encontrado"));
        Usuario user2 = usuarioRepository.findById(user2Id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario 2 no encontrado"));

        // Verificamos si ya existe una conversación entre estos usuarios
        Conversation conversation = conversationRepository.findBetweenUsers(user1, user2)
                .orElseGet(() -> {
                    Conversation nueva = new Conversation();
                    nueva.setUser1(user1);
                    nueva.setUser2(user2);
                    return conversationRepository.save(nueva);
                });
        return toConversationDto(conversation);
    }

   // public List<Conversation> obtenerConversacionesDeUsuario(Long userId) {
    //    return conversationRepository.findByUsuarioId(userId);
   // }

    public ResponseEntity<ConversationDto> getConversationBetween(Usuario user1, Long user2id) {
        Optional<Usuario> user2Optional = usuarioRepository.findById(user2id);
        if (user2Optional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Usuario user2 = user2Optional.get();

        Optional<Conversation> conversation = conversationRepository.findBetweenUsers(user1, user2);
        if (conversation.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Conversation realConversation = conversation.get();
        return new ResponseEntity<>(toConversationDto(realConversation), HttpStatus.OK);
    }

    public List<ConversationDto> findAllMyConversations(Usuario currentUser) {
        List<Conversation> conversations = conversationRepository.findByUser1OrUser2OrderByLastUpdatedDesc(currentUser, currentUser);
        return conversations.stream()
                .map(this::toConversationDto)
                .toList();
    }

}


