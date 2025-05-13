package com.Momentum.Momentum.conversation;

import com.Momentum.Momentum.message.MessageDTO;
import com.Momentum.Momentum.usuario.UsuarioDto;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ConversationDto {
    private Long id;
    private UsuarioDto user1;
    private UsuarioDto user2;
    private List<MessageDTO> messages;
    private Instant lastUpdated;

}
