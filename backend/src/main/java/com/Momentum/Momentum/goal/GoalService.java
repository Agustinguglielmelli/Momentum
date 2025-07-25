package com.Momentum.Momentum.goal;


import com.Momentum.Momentum.event.EventRepository;
import com.Momentum.Momentum.recreationalpost.RecreationalPostRepository;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import com.Momentum.Momentum.goal.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class GoalService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private RecreationalPostRepository recPostRepository;

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private RecreationalPostRepository recreationalPostRepository;

    public Goal createGoal(Goal goal) {
        return goalRepository.save(goal);
    }

    public Goal updateGoal(Goal goal) {
        return goalRepository.save(goal);
    }

    public List<Goal> listAllGoalsOfUser(long userId) {
        return goalRepository.findByUsuarioId(userId);
    }

    public Optional<Goal> getGoalById(long goalId) {
        return goalRepository.findById(goalId);
    }

    public void deleteGoal(long goalId) {
        goalRepository.deleteById(goalId);
    }

    public Double getCurrentProgress(Long userId, String goalType, LocalDate fromDate, boolean isCompleted) {
        // Si el objetivo ya está completado, no actualizar más el progreso
        if (isCompleted) {
            return null; // No actualizar
        }

        if (goalType.equals("RUNNING")) {
            if (fromDate != null) {
                return recPostRepository.getTotalDistanceByUserIdWithDate(userId, fromDate);
            } else {
                return recPostRepository.getTotalDistanceByUserId(userId);
            }
        }
        return 0.0;
    }

    public List<Goal> getInProgressGoals(Long userId) {
        List<Goal> allGoals = goalRepository.findByUsuarioId(userId);
        return allGoals.stream()
                .filter(goal -> goal.getProgress() < goal.getTarget())
                .collect(Collectors.toList());
    }

    public List<Goal> getCompletedGoals(Long userId) {
        List<Goal> allGoals = goalRepository.findByUsuarioId(userId);
        return allGoals.stream()
                .filter(goal -> goal.getProgress() >= goal.getTarget())
                .collect(Collectors.toList());
    }
}