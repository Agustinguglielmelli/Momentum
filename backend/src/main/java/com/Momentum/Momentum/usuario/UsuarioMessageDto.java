package com.Momentum.Momentum.usuario;

public class UsuarioMessageDto {
    Long id;
    String username;

    public UsuarioMessageDto(String username, Long id) {
        this.username = username;
        this.id = id;

    }
    public UsuarioMessageDto(){}


    public String getUsername() {
        return username;
    }

    public Long getId() {
        return id;
    }


}
