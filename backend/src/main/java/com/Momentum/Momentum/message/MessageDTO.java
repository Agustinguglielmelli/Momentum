    package com.Momentum.Momentum.message;
    
    import java.time.Instant;
    
    import com.Momentum.Momentum.usuario.Usuario;
    import com.Momentum.Momentum.usuario.UsuarioDto;
    import com.Momentum.Momentum.usuario.UsuarioMessageDto;
    import lombok.Getter;
    import lombok.Setter;
    
    
@Getter
@Setter
public class MessageDTO {
private String content;
private Instant timestamp;
private UsuarioMessageDto sender;
private UsuarioMessageDto receiver;

public MessageDTO(String content, Instant timestamp, UsuarioMessageDto senderId, UsuarioMessageDto receiverId) {
    this.content = content;
    this.timestamp = timestamp;
    this.sender = senderId;
    this.receiver = receiverId;
}
public MessageDTO() {}
}


