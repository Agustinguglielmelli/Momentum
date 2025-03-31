package com.Momentum.Momentum.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Repository extends JpaRepository<Usuario, Long> {
    //JPA maneja las consultas SQL, no es necesario escribirlas aca
    Optional<Usuario> findByUsername(String username);
}
