package com.Momentum.Momentum.goal;


import com.Momentum.Momentum.event.EventRepository;
import com.Momentum.Momentum.recreationalpost.RecreationalPostRepository;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import com.Momentum.Momentum.goal.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class GoalService {

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

    // Método para obtener el progreso actual basado en el tipo de meta
    public Double getCurrentProgress(long userId, String goalType) {
        switch (goalType) {
            case "RUNNING":
                return  recreationalPostRepository.getTotalDistanceByUserId(userId);
            case "CALORIES":
                Integer calories = recreationalPostRepository.getTotalCaloriesByUserId(userId);
                return calories != null ? calories.doubleValue() : 0.0;

            case "EVENTS":
                return eventRepository.countCompletedEventsByUser(userId);
            // aca se agregaran demas casos de metas
            default:
                return 0;
        }
    }
}