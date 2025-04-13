package com.Momentum.Momentum.recreationalPost;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecreationalPostRepository extends JpaRepository<Usuario, Long> {
    //JPA maneja las consultas SQL, no es necesario escribirlas aca
    Optional<Usuario> findByEmail(String email);
}//editar esta interfaz, no se si es necesario que reciba un usuario