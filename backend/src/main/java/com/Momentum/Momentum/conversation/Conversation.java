package com.Momentum.Momentum.conversation;

import com.Momentum.Momentum.message.Message;
import com.Momentum.Momentum.usuario.Usuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import java.time.Instant;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "conversations")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Usuarios que participan en la conversación
    @ManyToMany
    @JoinTable(
        name = "conversation_usuarios",
        joinColumns = @JoinColumn(name = "conversation_id"),
        inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private List<Usuario> participantes;

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    private List<Message> mensajes;

    @Column(nullable = false)
    private Instant lastUpdated;

   
}
