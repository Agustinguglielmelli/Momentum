package com.Momentum.Momentum.Usuario;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Setter
@Getter
@Entity
@Table(name = "Usuario")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column (nullable = false)
    private String username;

    @Column (nullable = false, unique = true)
    private String email;

    @Column (nullable = false)
    private  String password;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String profile_picture;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Role role;

    public Usuario() {}

    public Usuario(long id, String username, String email, String password, String profile_picture, Role role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profile_picture = profile_picture;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
