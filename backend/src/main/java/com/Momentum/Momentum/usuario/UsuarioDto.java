package com.Momentum.Momentum.usuario;


public class UsuarioDto {
    String username;
    Long id;
    String profilePicture;

    public UsuarioDto(String username, Long id, String profilePicture) {
        this.username = username;
        this.id = id;
        this.profilePicture = profilePicture;
    }

    public String getUsername() {
        return username;
    }

    public Long getId() {
        return id;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

}
