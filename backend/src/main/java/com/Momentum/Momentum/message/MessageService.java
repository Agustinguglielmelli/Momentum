package com.Momentum.Momentum.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public Message saveMessage(Message message){
        messageRepository.save(message);
        return message;
    }

    public List<Message> findByConversationId(Long conversationId) {
    return messageRepository.findByConversationIdOrderByTimestampAsc(conversationId);
    }
}

