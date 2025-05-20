package com.Momentum.Momentum.goal;


import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findByUsuarioId(Long userId);

}