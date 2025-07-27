package com.Momentum.Momentum.usuario;


import com.Momentum.Momentum.oauth2.AuthProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    //JPA maneja las consultas SQL, no es necesario escribirlas aca
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByEmailAndAuthProvider(String email, AuthProvider provider);
    List<Usuario> findByUsernameStartingWithIgnoreCase(String username);

    @Query("""
    SELECT f, COALESCE(SUM(rp.distance), 0) 
    FROM Usuario u 
    JOIN u.following f 
    LEFT JOIN RecreationalPost rp ON rp.usuario = f 
    WHERE u = :usuario 
    GROUP BY f 
    ORDER BY COALESCE(SUM(rp.distance), 0) DESC
    """)
    List<Object[]> findFollowedUsersAndKms(@Param("usuario") Usuario usuario); // leaderboard seguidos kms

    @Query("""
    SELECT COALESCE(SUM(rp.distance), 0) 
    FROM RecreationalPost rp 
    WHERE rp.usuario = :usuario
""")
    Double getTotalDistanceByUsuario(@Param("usuario") Usuario usuario);
}
