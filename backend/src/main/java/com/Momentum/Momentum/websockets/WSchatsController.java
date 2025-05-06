package com.Momentum.Momentum.websockets;

import com.Momentum.Momentum.message.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WSchatsController {

    @MessageMapping("/chat1")
    @SendTo("/topic/canal1")
    public String getMessages(Message message) {
        System.out.println("Mensaje recibido: " + message);
        return "Mensaje recibido: " + message;
    }
}
