package com.Momentum.Momentum.Usuario;

import jakarta.persistence.*;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Setter
@Entity
@Table(name = "RecPost")
public class RecreationalPost implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPost;

    @Column (nullable = false)
    private String username;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String postingPicture;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Role role;


    public Usuario(long id, String username, String postingPicture, Role role) {
        this.id = id;
        this.username = username;
        this.postingPicture;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public Role getRole() {
        return role;
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
