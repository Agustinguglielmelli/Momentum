package com.Momentum.Momentum.usuario;


public class UsuarioDto {
    String username;
    Long id;
    String profilePicture;
    String displayUserName;

    public UsuarioDto(String username, Long id, String profilePicture, String displayUserName) {
        this.username = username;
        this.id = id;
        this.profilePicture = profilePicture;
        this.displayUserName = displayUserName;
    }

    public String getDisplayUserName() {
        return displayUserName;
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
