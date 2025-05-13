package com.Momentum.Momentum.conversation;

import com.Momentum.Momentum.message.Message;
import com.Momentum.Momentum.usuario.Usuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ManyToOne;
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
@Table(name = "conversation")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Usuario que inicia la conversación
    @ManyToOne
    @JoinColumn(name = "user1_id", nullable = false)
    private Usuario user1;

    // Usuario receptor
    @ManyToOne
    @JoinColumn(name = "user2_id", nullable = false)
    private Usuario user2;

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    private List<Message> messages;

    @Column(nullable = false)
    private Instant lastUpdated;

}
