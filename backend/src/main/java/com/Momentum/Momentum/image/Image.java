package com.Momentum.Momentum.image;

import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String base64Data;

    @ManyToOne
    @JoinColumn (name = "recreationalPostId")
    @JsonBackReference
    private RecreationalPost recreationalPost;

    public Image() {
    }

}