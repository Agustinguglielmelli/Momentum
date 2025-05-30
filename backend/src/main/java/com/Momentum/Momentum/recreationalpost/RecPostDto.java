package com.Momentum.Momentum.recreationalpost;

import com.Momentum.Momentum.image.Image;
import com.Momentum.Momentum.usuario.UsuarioDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
public class RecPostDto {
    private long idRecPost;
    private Double distance;
    private String description;
    private String duration;
    private String calories;
    private UsuarioDto usuario;
    private List<Image> images;
    private LocalDate fechaPublicacion;

    public RecPostDto(long idRecPost, Double distance, String description,
                      String duration, String calories, UsuarioDto usuario,
                      List<Image> images, LocalDate fechaPublicacion) {
        this.idRecPost = idRecPost;
        this.distance = distance;
        this.description = description;
        this.duration = duration;
        this.calories = calories;
        this.usuario = usuario;
        this.images = images;
        this.fechaPublicacion = fechaPublicacion;
    }
}
