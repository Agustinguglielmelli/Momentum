package com.Momentum.Momentum.trainingplanpost;

import java.util.List;
import java.util.Optional;

import com.Momentum.Momentum.recreationalpost.RecreationalPostRepository;
import org.springframework.beans.factory.annotation.Autowired;


@org.springframework.stereotype.Service
public class TrainingPlanPostService {
    @Autowired
    TrainingPlanPostRepository trainingPlanPostRepository;


    public List<TrainingPlanPost> listTrainingPlansOfUser(Long userId) {
        return trainingPlanPostRepository.findByUsuarioId(userId);
    }

    public Optional<TrainingPlanPost> getTrainingPlanById(long id){
        return trainingPlanPostRepository.findById(id);
    }

    public TrainingPlanPost createTrainingPlan(TrainingPlanPost trainingplan){
        return trainingPlanPostRepository.save(trainingplan);
    }

    public void deleteTrainingPlanById(Long id){
        trainingPlanPostRepository.deleteById(id);
    }
    public TrainingPlanPost modifyTrainingPlan(TrainingPlanPost trainingplan){
        return trainingPlanPostRepository.save(trainingplan);
    }




}
