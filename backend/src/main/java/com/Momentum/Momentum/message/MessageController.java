package com.Momentum.Momentum.message;

import org.springframework.web.bind.annotation.*;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;



@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;


    @GetMapping("/history/conversation/{conversationId}")
    public List<MessageDTO> getMessagesByConversation(@PathVariable Long conversationId) {
        List<Message> messages = messageService.findByConversationId(conversationId);
        return messages.stream()
            .map(msg -> new MessageDTO(
                msg.getContent(),
                msg.getTimestamp(),
                msg.getSender().getId(),
                msg.getReceiver().getId()
            ))
            .toList();
        }   
}
