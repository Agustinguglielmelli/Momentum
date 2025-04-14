package com.Momentum.Momentum.recreationalpost;

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
    private long idPost;

    @Column (nullable = false)
    private String description;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String postingPicture;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Usuario usuario;


    @Enumerated(value = EnumType.STRING)
    @Column
    private Role role;


    public RecreationalPost(long id, String description, String postingPicture, Usuario usuario, Role role) {
        this.id = id;
        this.description = description;
        this.postingPicture= postingPicture;
        this.role = role;
    }

    @Override
    public String getDescription() {
        return description;
    }

    public long getId() {
        return id;
    }

    
    public String getPostingPicture() {
        return postingPicture;
    }

    public Role getRole() {
        return role;
    }
}
   