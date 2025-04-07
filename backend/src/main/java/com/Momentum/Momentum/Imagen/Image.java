package com.Momentum.Momentum.Imagen;

import jakarta.persistence.*;
import lombok.Setter;

@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Lob // Permite guardar datos grandes
    @Column(columnDefinition = "TEXT")
    private String base64Data;

    public Image() {
    }
    public Long getId() {
        return id;
    }

    public String getBase64Data() {
        return base64Data;
    }
}