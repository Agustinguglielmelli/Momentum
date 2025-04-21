package com.Momentum.Momentum.event;

//import lombok.Setter;
//import lombok.Getter;
import jakarta.persistence.*;
import com.Momentum.Momentum.usuario.Usuario;
import java.util.Set;

//@Getter
//@Setter
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

    @ManyToOne
    @JoinColumn(name = "creador_id") 
    private Usuario creadorDeEvento;

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
    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public String getStartAtPlace(){
        return startAtPlace;
    }
    public void setStartAtPlace(String startAtPlace){
        this.startAtPlace= startAtPlace;
    }
    public String getEndAtPlace(){
        return endAtPlace;
    }
    public void setEndAtPlace(String endAtPlace){
        this.endAtPlace = endAtPlace;
    }
    public String getTitle(){
        return title;
    }
    public void setTitle(String title){
        this.title= title;
    }
    public String getDate(){
        return date;
    }
    public void setDate(String date){
        this.date = date;
    }
    public String getKmToRun(){
        return kmToRun;
    }
    public void setKmToRun(String kmToRun){
        this.kmToRun = kmToRun;
    }
    public Set<Usuario> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<Usuario> participants) {
        this.participants = participants;
    }

    /*public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    */
    public Usuario getCreadorDeEvento(){
        return creadorDeEvento;
    }
    public void setCreadorDeEvento(Usuario creador){
        this.creadorDeEvento = creador;
    }

    public long getIdEvent() {
        return idEvent;
    }

}