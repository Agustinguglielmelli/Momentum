package com.Momentum.Momentum.conversation.websocket;


import com.Momentum.Momentum.conversation.Conversation;
import com.Momentum.Momentum.conversation.ConversationDto;
import com.Momentum.Momentum.conversation.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class ConversacionSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ConversationService conversationService;

    @MessageMapping("/start-conversation") // el frontend envía a /app/start-conversation
    public void startConversation(@Payload Map<String, Long> request) {

        Long user1Id = request.get("user1Id");
        Long user2Id = request.get("user2Id");

        // Validaciones y lógica de negocio
        ConversationDto conversationDto = conversationService.createConversation(user1Id, user2Id);

        // Notificar a ambos usuarios por WebSocket
        messagingTemplate.convertAndSendToUser(
            conversationDto.getUser1().toString(),
            "/queue/conversations",
            conversationDto
        );

        messagingTemplate.convertAndSendToUser(
            conversationDto.getUser2().toString(),
            "/queue/conversations",
            conversationDto
        );
    }
}
