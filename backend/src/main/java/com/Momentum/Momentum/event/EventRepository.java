package com.Momentum.Momentum.event;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    //JPA maneja las consultas SQL, no es necesario escribirlas aca
    Set<Event> findByCreadorId(Long id);
    List<Event> findByParticipantes_Id(Long id);
    Event findByIdEvent(long id);
    List<Event> findByTitleStartingWithIgnoreCase(String title);


}