package com.Momentum.Momentum.Imagen;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob // Permite guardar datos grandes
    @Column(columnDefinition = "TEXT")
    private String base64Data;

    public Image() {
    }

}