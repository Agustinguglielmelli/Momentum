package com.Momentum.Momentum.message;

import com.Momentum.Momentum.usuario.Usuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Instant timestamp;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private Usuario sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private Usuario receiver;

    public Message(String content, Instant timestamp, Usuario sender, Usuario receiver) {
        this.content = content;
        this.timestamp = timestamp;
        this.sender = sender;
        this.receiver = receiver;
    }
}
