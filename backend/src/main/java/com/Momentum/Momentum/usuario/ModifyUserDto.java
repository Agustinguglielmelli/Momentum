package com.Momentum.Momentum.usuario;

public class ModifyUserDto {
    String username;
    String email;
    String profilePicture;

    public ModifyUserDto(String username, String profilePicture, String email) {
        this.username = username;
        this.profilePicture = profilePicture;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

}
