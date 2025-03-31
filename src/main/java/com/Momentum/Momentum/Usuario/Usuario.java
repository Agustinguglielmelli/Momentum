package com.Momentum.Momentum.Usuario;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "Usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column (nullable = false, length = 50)
    private String username;

    @Column (nullable = false, length = 50, unique = true)
    private String email;

    @Column (nullable = false, length = 50)
    private  String password;

    @Column (nullable = false, length = 50)
    private String profile_picture;

    public Usuario() {}

    public Usuario(long id, String username, String email, String password, String profile_picture) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profile_picture = profile_picture;
    }

}
