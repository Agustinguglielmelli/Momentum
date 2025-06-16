package com.Momentum.Momentum.comment;

import com.Momentum.Momentum.event.Event;
import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.usuario.Usuario;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "author_id", nullable = false)
    private Usuario author;

    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonBackReference
    private RecreationalPost post;

    @ManyToOne
    @JoinColumn(name = "event_id")
    @JsonIgnore
    private Event event;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Comment() {}

    public void setText(String text) {
        if (text != null && text.length() > 1000) {
            throw new IllegalArgumentException("El comentario no puede superar los 1000 caracteres");
        }
        this.text = text;
    }
}
