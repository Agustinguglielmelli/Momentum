package com.Momentum.Momentum.recreationalpost;

import com.Momentum.Momentum.trainingplanpost.TrainingPlanPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecreationalPostRepository extends JpaRepository<RecreationalPost, Long> {
    //JPA maneja las consultas SQL, no es necesario escribirlas aca
    List<RecreationalPost> findByUsuarioId(Long userId);
}