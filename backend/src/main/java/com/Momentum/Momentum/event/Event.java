package com.Momentum.Momentum.event;

import lombok.Setter;
import lombok.Getter;
import jakarta.persistence.*;
import com.Momentum.Momentum.usuario.Usuario;
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

    // relacion con los usuarios
    // se crea una tabla intermedia event_user
    @ManyToMany
    @JoinTable(
            name = "event_user", // nombre de la tabla intermedia
            joinColumns = @JoinColumn(name = "event_id"), // clave de evento
            inverseJoinColumns = @JoinColumn(name = "user_id") // clave de usuario
    )
    private Set<Usuario> participants;

    public Event(){}

    public Event(String title, String description, String startAtPlace,
     String endAtPlace, String date, String kmToRun){
        this.title=title;
        this.description=description;
        this.startAtPlace=startAtPlace;
        this.endAtPlace=endAtPlace;
        this.date=date;
        this.kmToRun=kmToRun;
    }
    

}