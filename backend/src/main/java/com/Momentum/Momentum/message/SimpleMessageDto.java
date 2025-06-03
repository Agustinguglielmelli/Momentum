package com.Momentum.Momentum.message;

import com.Momentum.Momentum.usuario.UsuarioDto;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class SimpleMessageDto {
    private String content;
    private Instant timestamp;

    public SimpleMessageDto(String content, Instant timestamp) {
        this.content = content;
        this.timestamp = timestamp;
    }
    public SimpleMessageDto() {}
}