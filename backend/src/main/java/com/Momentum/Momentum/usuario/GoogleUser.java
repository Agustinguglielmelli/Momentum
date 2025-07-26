package com.Momentum.Momentum.usuario;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GoogleUser {
    private String email;
    private String firstName;
    private String lastName;
    private String pictureUrl; // opcional

    public GoogleUser(String email, String firstName, String lastName, String pictureUrl) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pictureUrl = pictureUrl;
    }
}

