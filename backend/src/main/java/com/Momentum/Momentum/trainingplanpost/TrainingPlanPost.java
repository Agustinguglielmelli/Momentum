package com.Momentum.Momentum.trainingplanpost;

import com.Momentum.Momentum.usuario.Usuario;
import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;

//@Getter
//@Setter
@Entity
@Table(name = "TrainingPlanPost")
public class TrainingPlanPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idTrainPost;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Usuario usuario;

    @Column (nullable = false)
    private String description;

    @Column (nullable = false)
    private String frequency;

    @Column (nullable = false)
    private String title;

    @Column (nullable = false)
    private String duration;

    @Column (nullable = false)
    private String dia1;

    @Column
    private String dia2;

    @Column
    private String dia3;

    @Column
    private String dia4;

    @Column
    private String dia5;

    @Column
    private String dia6;

    @Column
    private String dia7;

    public TrainingPlanPost(long idTrainPost, String description, Usuario usuario, String dia1, String dia2,
                            String dia3, String dia4, String dia5, String dia6, String dia7) {
        this.idTrainPost = idTrainPost;
        this.description = description;
        this.usuario = usuario;
        this.dia1 = dia1;
        this.dia2 = dia2;
        this.dia3 = dia3;
        this.dia4 = dia4;
        this.dia5 = dia5;
        this.dia6 = dia6;
        this.dia7 = dia7;
    }

    public TrainingPlanPost() {

    }

    public long getIdTrainPost() {
        return idTrainPost;
    }
    public Usuario getUsuario(){
        return usuario;
    }
    public String getDescription(){
        return description;
    }
    public String getDia1(){
        return dia1;
    }
    public String getDia2(){
        return dia2;
    }
    public String getDia3(){
        return dia3;
    }
    public String getDia4(){
        return dia4;
    }
    public String getDia5(){
        return dia5;
    }
    public String getDia6(){
        return dia6;
    }
    public String getDia7(){
        return dia7;
    }
    public String getDuration(){
        return duration;
    }
    public String getTitle(){
        return title;
    }
    public String getFrequency(){
        return frequency;
    }

    public void setUsuario(Usuario usuario){
        this.usuario = usuario;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public void setDuration(String duration){
        this.duration = duration;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public void setFrequency(String frequency){
        this.frequency = frequency;
    }
    public void setDia1(String dia1){
        this.dia1= dia1; 
    }
    public void setDia2(String dia2){
        this.dia2=dia2;
    }
    public void setDia3(String dia3){
        this.dia3 = dia3; 
    }
    public void setDia4(String dia4){
        this.dia4 = dia4;
    }
    public void setDia5(String dia5){
        this.dia5 = dia5;
    }
    public void setDia6(String dia6){
        this.dia6 = dia6;
    }
    public void setDia7(String dia7){
        this.dia7 = dia7;
    }
}
