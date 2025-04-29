package com.Momentum.Momentum.usuario;

public class ModifyUserDto {
    String username;
    Long id;
    String profilePicture;
    String displayUserName;
    String password;


    public ModifyUserDto(String username, Long id, String profilePicture, String displayUserName, String password) {
        this.username = username;
        this.id = id;
        this.profilePicture = profilePicture;
        this.displayUserName = displayUserName;
        this.password = password;
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
    public String getPassword() {
        return password;
    }

}
