package com.Momentum.Momentum.websockets;

import com.Momentum.Momentum.message.Message;
import com.Momentum.Momentum.message.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    @Autowired
    private MessageService messageService;

    public Message saveMessage(Message message) {
        messageService.saveMessage(message);
        return message;
    }
}
