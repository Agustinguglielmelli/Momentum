package com.Momentum.Momentum.Usuario;

import jakarta.persistence.*;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Setter
@Entity
@Table(name = "TrainPlanPost")
public class TrainPlanPost implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPost;

    @Column (nullable = false)
    private String username;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Role role;

    @Column (nullable = false)
    private String dia1;

    @Column (nullable = false)
    private String dia2;

    @Column (nullable = false)
    private String dia3;

    @Column (nullable = false)
    private String dia4;

    @Column (nullable = false)
    private String dia5;

    @Column (nullable = false)
    private String dia6;

    @Column (nullable = false)
    private String dia7;


    public TrainPlanPost(long id, String username, Role role, String dia1, String dia2,
    String dia3, String dia4, String dia5, String dia6, String dia7) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.dia1 = dia1;
        this.dia2 = dia2;
        this.dia3 = dia3;
        this.dia4 = dia4;
        this.dia5 = dia5;
        this.dia6 = dia6;
        this.dia7 = dia7;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }


    @Override
    public String getUsername() {
        return email;
    }

    public long getId() {
        return id;
    }

    public Role getRole() {
        return role;
    }

    public String getDia1(){
        return dia1;
    }
    public String getDia2(){
        return dia2;
    }
    public String getDia3(){
        return dia3;
    }
    public String getDia4(){
        return dia4;
    }
    public String getDia5(){
        return dia5;
    }
    public String getDia6(){
        return dia6;
    }
    public String getDia7(){
        return dia7;
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
