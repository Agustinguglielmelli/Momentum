package com.Momentum.Momentum.goal;


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
    private GoalRepository goalRepository;
    private UsuarioRepository userRepository;

    @Autowired
    public GoalService(GoalRepository goalRepository, UsuarioRepository userRespository) {
        this.goalRepository = goalRepository;
    }

    public Goal createGoal(Goal goal){
        return goalRepository.save(goal);
    }
    public Goal updateGoal(Goal goal){
        return goalRepository.save(goal);
    }
    public List<Goal> listAllGoalsOfUser(long userId){
        return goalRepository.findByUsuarioId(userId);
    }
    public Optional<Goal> getGoalById(long goalId){
        return goalRepository.findById(goalId);
    }



}
