package com.Momentum.Momentum.recreationalpost;

import com.Momentum.Momentum.comment.Comment;
import com.Momentum.Momentum.image.Image;
import com.Momentum.Momentum.like.Like;
import com.Momentum.Momentum.usuario.Usuario;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Comment> comments;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Like> likes = new HashSet<>();

    @ManyToOne
    @JsonBackReference("user-recposts")
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


    @PrePersist
    protected void onCreate() {
        this.creationDate = LocalDate.now();
    }

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

