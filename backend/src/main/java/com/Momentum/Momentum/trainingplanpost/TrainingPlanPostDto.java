package com.Momentum.Momentum.trainingplanpost;


import com.Momentum.Momentum.usuario.UsuarioDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TrainingPlanPostDto {

    private long idTrainPost;
    private UsuarioDto usuario;
    private String description;
    private String frequency;
    private String title;
    private String duration;
    private String dia1;
    private String dia2;
    private String dia3;
    private String dia4;
    private String dia5;
    private String dia6;
    private String dia7;

    public TrainingPlanPostDto() {
    }

    public TrainingPlanPostDto(long idTrainPost, UsuarioDto usuario, String description, String frequency,
                               String title, String duration, String dia1, String dia2, String dia3,
                               String dia4, String dia5, String dia6, String dia7) {
        this.idTrainPost = idTrainPost;
        this.usuario = usuario;
        this.description = description;
        this.frequency = frequency;
        this.title = title;
        this.duration = duration;
        this.dia1 = dia1;
        this.dia2 = dia2;
        this.dia3 = dia3;
        this.dia4 = dia4;
        this.dia5 = dia5;
        this.dia6 = dia6;
        this.dia7 = dia7;
    }
}