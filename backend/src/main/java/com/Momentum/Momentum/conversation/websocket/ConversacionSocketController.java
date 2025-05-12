package com.Momentum.Momentum.conversation.websocket;


import com.Momentum.Momentum.conversation.Conversation;
import com.Momentum.Momentum.conversation.ConversationDTO;
import com.Momentum.Momentum.conversation.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ConversacionSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ConversationService conversationService;

    @MessageMapping("/start-conversation") // el frontend envía a /app/start-conversation
    public void startConversation(ConversationDTO conversationDTO) {

        // Crear conversación (si no existe ya)
        Conversation conversacion = conversationService.crearConversation(
            conversationDTO.getUser1Id(), conversationDTO.getUser2Id()
        );

        // Convertir a DTO (simplificado aquí)
        ConversationDTO responseDTO = new ConversationDTO(
            conversation.getId(),
            conversationDTO.getUser1Id(),
            conversationDTO.getUser2Id(),
            conversation.getLastUpdated()
        );

        // Notificar a ambos usuarios por WebSocket
        messagingTemplate.convertAndSendToUser(
            conversationDTO.getUser1Id().toString(),
            "/queue/conversations",
            responseDTO
        );

        messagingTemplate.convertAndSendToUser(
            conversationDTO.getUser2Id().toString(),
            "/queue/conversations",
            responseDTO
        );
    }
}
