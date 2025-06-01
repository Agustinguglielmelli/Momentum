package com.Momentum.Momentum.recreationalpost;

import com.Momentum.Momentum.usuario.UsuarioDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class RecPostWithInteractionsDto {
    private Long idRecPost;
    private Double distance;
    private String description;
    private String duration;
    private String calories;
    private LocalDate creationDate;
    private UsuarioDto usuario;
    private List<String> images;
    private long likeCount;
    private boolean userLiked;
    private int commentCount;

    public RecPostWithInteractionsDto(){}
}
