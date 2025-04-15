package com.Momentum.Momentum.event;

import lombok.Setter;
import lombok.Getter;
import jakarta.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "Evento")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idEvento;

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