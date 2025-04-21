package com.Momentum.Momentum.event;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    //JPA maneja las consultas SQL, no es necesario escribirlas aca
     List<Event> findByUsuarioId(Long userId);
}