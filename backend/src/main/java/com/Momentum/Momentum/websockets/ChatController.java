package com.Momentum.Momentum.websockets;

import com.Momentum.Momentum.conversation.Conversation;
import com.Momentum.Momentum.conversation.ConversationRepository;
import com.Momentum.Momentum.message.Message;
import java.security.Principal;
import java.time.Instant;
import java.util.Optional;

import com.Momentum.Momentum.message.MessageDTO;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

//esta clase chatController puede ser util para manejar chats de grupos, pero si solo es mensajes 1 a 1,
//entonces solo sera necesarios los conversation controller. 
@Controller
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate simpleMessagingTemplate;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @MessageMapping("/send-message") // el frontend enviará a /app/send-message
    public void sendMessage(@Payload MessageDTO messageDTO) {

        Optional<Usuario> senderOpt = usuarioRepository.findById(messageDTO.getSender().getId());
        Optional<Usuario> receiverOpt = usuarioRepository.findById(messageDTO.getReceiver().getId());

        if (senderOpt.isEmpty() || receiverOpt.isEmpty()) {
            return;
        }

        Usuario sender = senderOpt.get();
        Usuario receiver = receiverOpt.get();

        Optional<Conversation> conversationOpt = conversationRepository.findBetweenUsers(sender, receiver);
        if (conversationOpt.isEmpty()) {
            return;
        }

        Conversation conversation = conversationOpt.get();

        Message message = new Message(
                messageDTO.getContent(),
                Instant.now(),
                sender,
                receiver,
                conversation
        );

        chatService.saveMessage(message);

        MessageDTO dto = new MessageDTO(
                message.getContent(),
                message.getTimestamp(),
                messageDTO.getSender(),
                messageDTO.getReceiver()
        );

        // Enviamos el mensaje al receptor
        simpleMessagingTemplate.convertAndSendToUser(
                messageDTO.getReceiver().getUsername(),
                "/queue/messages",
                dto
        );

        // Enviamos el mensaje al emisor también (para que vea reflejado el envío en tiempo real)
        simpleMessagingTemplate.convertAndSendToUser(
                messageDTO.getSender().getUsername(),
                "/queue/messages",
                dto
        );
    }

}
