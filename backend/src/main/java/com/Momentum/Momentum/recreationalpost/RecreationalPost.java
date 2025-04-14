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

    @Column(nullable = false)
    private String username;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String profilePicture;
    
    @Column(nullable = false)
    private String description;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String postingPicture;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Role role;

    public RecreationalPost(long idPost, String username, String profilePicture,
                            String description, String postingPicture, Role role) {
        this.idPost = idPost;
        this.username = username;
        this.profilePicture = profilePicture;
        this.description = description;
        this.postingPicture = postingPicture;
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
   