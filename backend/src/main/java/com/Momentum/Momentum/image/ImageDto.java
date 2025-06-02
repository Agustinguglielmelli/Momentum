package com.Momentum.Momentum.image;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ImageDto {
    private Long id;
    private String base64Data;

    public ImageDto(){}
    public ImageDto(Long id, String base64Data){
        this.id=id;
        this.base64Data=base64Data;
    }
}
