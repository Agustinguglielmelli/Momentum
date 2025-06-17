package com.Momentum.Momentum.recreationalpost;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;


public interface RecreationalPostRepository extends JpaRepository<RecreationalPost, Long> {
    //JPA maneja las consultas SQL, no es necesario escribirlas aca
    List<RecreationalPost> findByUsuarioId(Long userId);

    @Query("SELECT SUM(r.distance) FROM RecreationalPost r WHERE r.usuario.id = :userId")
    Double getTotalDistanceByUserId(@Param("userId") Long userId);



    // Busca publicaciones que contengan un hashtag exacto
/*
    List<RecreationalPost> findByHashtagsContaining(String hashtag);
*/
    /*@Query("SELECT COALESCE(SUM(r.calories), 0) FROM RecreationalPost r WHERE r.usuario.id = :userId")
    Integer getTotalCaloriesByUserId(@Param("userId") Long userId);*/
}

