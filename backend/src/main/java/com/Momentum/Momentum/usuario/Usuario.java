package com.Momentum.Momentum.usuario;

import com.Momentum.Momentum.event.Event;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter
@Setter
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

    @Column(columnDefinition = "TEXT")
    private String profilePicture;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Role role;

    @OneToMany(mappedBy = "creador")
    @JsonManagedReference
    private Set<Event> eventosCreados = new HashSet<>();

    @ManyToMany(mappedBy = "participantes")
    @JsonIgnore
    private Set<Event> eventsImIn = new HashSet<>();

    public Usuario() {}

    public Usuario(long id, String username, String email, String password, String profilePicture, Role role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
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
    
    public String getuserUsername(){
        return username;
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
