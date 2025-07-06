package com.Momentum.Momentum.usuario;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PopularUserDto {
    String username;
    Long id;
    String profilePicture;
    String displayUserName;
    Integer followersCount;

    public PopularUserDto(String username, Long id, String profilePicture, String displayUserName, Integer followersCount) {
        this.username = username;
        this.id = id;
        this.profilePicture = profilePicture;
        this.displayUserName = displayUserName;
        this.followersCount = followersCount;
    }

    public PopularUserDto() {
    }

}
