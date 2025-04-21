package com.Momentum.Momentum.recreationalpost;

import com.Momentum.Momentum.image.Image;
import com.Momentum.Momentum.usuario.Usuario;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;


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
    public String getDistance(){
        return distance;
    }
    public void setDistance(String distance){
        this.distance = distance;
    }
    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description= description;
    }
    public String getDuration(){
        return duration;
    }
    public void setDuration(String duration){
        this.duration= duration;
    }
    public String getCalories(){
        return calories;
    }
    public void setCalories(String calories){
        this.calories= calories;
    }
    public List<Image> getImages() {
        return this.images;
    }

    public Usuario getUsuario() {
        return usuario; 
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public long getIdRecPost() {
        return idRecPost;
    }
}

   