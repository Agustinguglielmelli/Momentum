package com.Momentum.Momentum.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    //JPA maneja las consultas SQL, no es necesario escribirlas aca
}