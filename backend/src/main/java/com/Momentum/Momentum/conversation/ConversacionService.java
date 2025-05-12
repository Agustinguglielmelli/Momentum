package com.Momentum.Momentum.conversation;

import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Conversation crearConversacion(Long userId1, Long userId2) {
        // Verificar si ya existe una conversación entre ambos
        List<Conversation> existentes = conversationRepository.findByParticipants(userId1, userId2);
        if (!existentes.isEmpty()) {
            return existentes.get(0); // Ya existe
        }

        Usuario usuario1 = usuarioRepository.findById(userId1).orElseThrow();
        Usuario usuario2 = usuarioRepository.findById(userId2).orElseThrow();

        Conversation conversation = new Conversation();
        conversation.setParticipantes(List.of(usuario1, usuario2));
        conversation.setLastUpdated(Instant.now());

        return conversationRepository.save(conversation);
    }

    public List<Conversation> obtenerConversacionesDeUsuario(Long userId) {
        return conversationRepository.findByUsuarioId(userId);
    }

    public Optional<Conversation> obtenerPorId(Long id) {
        return conversationRepository.findById(id);
    }
}
