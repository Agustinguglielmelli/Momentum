package com.Momentum.Momentum.recreationalpost;

import com.Momentum.Momentum.image.Image;
import com.Momentum.Momentum.usuario.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
//import lombok.Setter;
//import lombok.Getter;


import java.time.LocalDate;
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
    @JsonManagedReference
    private List<Image> images;

    @ManyToOne
    @JsonIgnore
    @JoinColumn (name = "userId")
    private Usuario usuario;

    @Column
    private Double distance;

    @Column(nullable = false)
    private String description;

    @Column (nullable = false)
    private String duration;

    @Column
    private String calories;

    @Column(updatable = false)
    private LocalDate creationDate;

    public RecreationalPost(long idRecPost, Double distance, String description,
                            String duration, String calories, LocalDate creationDate)
    {
        this.idRecPost = idRecPost;
        this.distance = distance;
        this.description = description;
        this.duration = duration;
        this.calories = calories;
        this.creationDate = creationDate;
    }

    public RecreationalPost() {
    }
}

