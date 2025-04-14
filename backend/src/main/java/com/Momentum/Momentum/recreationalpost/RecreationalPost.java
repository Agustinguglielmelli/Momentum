package com.Momentum.Momentum.recreationalpost;

import com.Momentum.Momentum.image.Image;
import com.Momentum.Momentum.usuario.Usuario;
import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;


import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "RecPost")
public class RecreationalPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idRecPost;

    @OneToMany(mappedBy = "recreationalPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;

    @ManyToOne
    @JoinColumn (name = "userId")
    private Usuario usuario;

    @Column
    private String distance;

    @Column(nullable = false)
    private String description;

    @Column (nullable = false)
    private String duration;

    @Column
    private String calories;

    public RecreationalPost(long idRecPost, String distance, String description,
                            String duration, String calories)
    {
        this.idRecPost = idRecPost;
        this.distance = distance;
        this.description = description;
        this.duration = duration;
        this.calories = calories;
    }

    public RecreationalPost() {

    }
}
   