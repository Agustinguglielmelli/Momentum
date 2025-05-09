package com.Momentum.Momentum.usuario;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    //JPA maneja las consultas SQL, no es necesario escribirlas aca
    Optional<Usuario> findByEmail(String email);
    List<Usuario> findByUsernameStartingWithIgnoreCase(String username);

}
