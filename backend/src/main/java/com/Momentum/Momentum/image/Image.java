package com.Momentum.Momentum.image;

import com.Momentum.Momentum.recreationalpost.RecreationalPost;
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
    private RecreationalPost recreationalPost;

    public Image() {
    }

}