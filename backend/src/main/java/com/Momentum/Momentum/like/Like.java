
package com.Momentum.Momentum.like;

import com.Momentum.Momentum.event.Event;
import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.usuario.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "likes")
@Getter
@Setter
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonIgnore
    private RecreationalPost post;

    @ManyToOne
    @JoinColumn(name = "event_id")
    @JsonIgnore
    private Event event;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Like(){}
}
