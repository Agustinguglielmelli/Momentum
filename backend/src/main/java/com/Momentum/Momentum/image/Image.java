package com.Momentum.Momentum.image;

import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;

//@Getter
//@Setter
@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String base64Data;

    @ManyToOne
    @JoinColumn(name = "recreationalPostId")
    @JsonBackReference
    private RecreationalPost recreationalPost;

    public Image() {
    }
    public void setRecreationalPost(RecreationalPost recPost){
        this.recreationalPost= recPost;
    }

    public Long getId() {
        return id;
    }

    public RecreationalPost getRecreationalPost() {
        return recreationalPost;
    }

    public String getBase64Data() {
        return base64Data;
    }

}