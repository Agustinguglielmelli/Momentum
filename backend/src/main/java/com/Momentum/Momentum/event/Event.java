package com.Momentum.Momentum.event;

import com.Momentum.Momentum.like.Like;
import lombok.Setter;
import lombok.Getter;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import com.Momentum.Momentum.usuario.Usuario;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Evento")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idEvent;

    @Column(nullable=false)
    private String title;

    @Column(nullable=false)
    private String description;

    @Column(nullable=false)
    private String startAtPlace;

    @Column(nullable=false)
    private String endAtPlace;

    @Column(nullable=false)
    private String date;

    @Column(nullable=false)
    private String kmToRun;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "creador_id")  // Si el nombre de la columna en la base de datos es creador_id
    @JsonBackReference
    private Usuario creador;

    @ManyToMany
    @JoinTable(
            name = "evento_participantes",
            joinColumns = @JoinColumn(name = "evento_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    @JsonIgnore
    private Set<Usuario> participantes = new HashSet<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Like> likes = new HashSet<>();

    public Event(){
    }

    public Event(String title, String description, String startAtPlace,
     String endAtPlace, String date, String kmToRun) {
        this.title = title;
        this.description = description;
        this.startAtPlace = startAtPlace;
        this.endAtPlace = endAtPlace;
        this.date = date;
        this.kmToRun = kmToRun;
    }
}