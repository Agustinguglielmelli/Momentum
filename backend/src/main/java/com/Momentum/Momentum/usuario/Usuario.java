package com.Momentum.Momentum.usuario;

import com.Momentum.Momentum.comment.Comment;
import com.Momentum.Momentum.event.Event;
import com.Momentum.Momentum.goal.Goal;
import com.Momentum.Momentum.message.Message;
import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.trainingplanpost.TrainingPlanPost;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
@Table(name = "Usuario")
public class Usuario implements UserDetails {

    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Comment> comments = new HashSet<>();

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

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<RecreationalPost> recPosts = new HashSet<>();

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<TrainingPlanPost> trainingPlanPosts = new HashSet<>();

    @OneToMany(mappedBy = "creador", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Event> eventosCreados = new HashSet<>();

    @ManyToMany(mappedBy = "participantes")
    @JsonIgnore
    private Set<Event> eventsImIn = new HashSet<>();

    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "user_following",
            joinColumns = @JoinColumn(name = "follower_id"),
            inverseJoinColumns = @JoinColumn(name = "followed_id")
    )
    Set<Usuario> following = new HashSet<>();

    @ManyToMany (mappedBy = "following")
    @JsonIgnore
    Set<Usuario> followers = new HashSet<>();

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Message> messagesSent = new HashSet<>();

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Message> messagesReceived = new HashSet<>();

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Goal> goals = new HashSet<>();

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

    public String displayUserName(){
        return username;
    }

}
