package com.Momentum.Momentum.Usuario;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    //JPA maneja las consultas SQL, no es necesario escribirlas aca
    Optional<Usuario> findByEmail(String email);
}
