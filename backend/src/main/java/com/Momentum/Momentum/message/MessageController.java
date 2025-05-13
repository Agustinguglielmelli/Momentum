package com.Momentum.Momentum.message;

import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioDto;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;



@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;


    public UsuarioDto toUsuarioDto(Usuario usuario) {
        return new UsuarioDto(
                usuario.getUsername(),
                usuario.getId(),
                usuario.getProfilePicture(),
                usuario.displayUserName()
        );
    }
    @GetMapping("/history/conversation/{conversationId}")
    public List<MessageDTO> getMessagesByConversation(@PathVariable Long conversationId) {
        List<Message> messages = messageService.findByConversationId(conversationId);
        return messages.stream()
            .map(msg -> new MessageDTO(
                msg.getContent(),
                msg.getTimestamp(),
                    toUsuarioDto(msg.getSender()),
                    toUsuarioDto(msg.getReceiver())
            ))
            .toList();
        }   
}
