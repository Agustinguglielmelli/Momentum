package com.Momentum.Momentum.websockets;

import com.Momentum.Momentum.message.Message;
import java.security.Principal;
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

    @MessageMapping("/chat")
    @SendTo("/chatroom/messages")
    public Message send(Message message) {
        chatService.saveMessage(message);
        return message;
    }

    @MessageMapping("message")
    @SendTo("/chatroom/public")
    public Message receivePublicMessage(@Payload Message message){
        return message;
    }

    @MessageMapping("/private-message")
    public void receivePrivateMessage(@Payload Message message, Principal principal) {
    // Asegúrate de que 'principal.getName()' coincida con message.getSender().getUsername()
        simpleMessagingTemplate.convertAndSendToUser(
        message.getReceiver().getUsername(),
        "/private", 
        message
    );
}

}
