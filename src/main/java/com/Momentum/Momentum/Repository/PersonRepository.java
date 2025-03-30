package com.Momentum.Momentum.Repository;

import java.util.Optional;
import com.Momentum.Momentum.Domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
    //JPA maneja las consultas SQL, no es necesario escribirlas aca
    Optional<Person> findByUsername(String username);
}
