    package com.Momentum.Momentum.message;
    
    import java.time.Instant;
    
    import com.Momentum.Momentum.usuario.Usuario;
    import com.Momentum.Momentum.usuario.UsuarioDto;
    import lombok.Getter;
    import lombok.Setter;
    
    
    @Getter
    @Setter
        public class MessageDTO {
            private String content;
            private Instant timestamp;
            private UsuarioDto sender;
            private UsuarioDto receiver;
    
            public MessageDTO(String content, Instant timestamp, UsuarioDto senderId, UsuarioDto receiverId) {
                this.content = content;
                this.timestamp = timestamp;
                this.sender = senderId;
                this.receiver = receiverId;
            }
    }
    
    
