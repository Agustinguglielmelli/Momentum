package com.Momentum.Momentum.trainingplanpost;

import com.Momentum.Momentum.usuario.Usuario;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "TrainingPlanPost")
public class TrainingPlanPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idTrainPost;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userId", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String frequency;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String duration;

    @Column(nullable = false)
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

}
