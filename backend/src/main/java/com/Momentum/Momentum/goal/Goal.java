package com.Momentum.Momentum.goal;

import jakarta.persistence.Entity;
import com.Momentum.Momentum.usuario.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@Entity
@Table(name = "Goal")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn (name = "userId")
    private Usuario usuario;

    @Column(nullable = false)
    private int progress;

    @Column(nullable = false)
    private String color;

    @Column(updatable = false)
    private LocalDate creationDate;

    @PrePersist
    protected void onCreate() {
        this.creationDate = LocalDate.now();
    }

    public Goal(long id, int progress, String color){
        this.id = id;
        this.progress = progress;
        this.color = color;
    }
    public Goal(){}
}

