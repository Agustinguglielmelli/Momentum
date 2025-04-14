
package com.Momentum.Momentum.trainingplanpost;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000/miperfil")
public class TrainingPlanPostController {

    @Autowired
    TrainingPlanPostService trainingPlanPostService;

    @GetMapping("/miperfil")
    @ResponseBody
    public List<TrainingPlanPost> getAllTrainingPlans(){
        return trainingPlanPostService.listTrainingPlans();
    }

    @GetMapping("/miperfil/crearplanentrenamiento/{id}")
    public Optional<TrainingPlanPost> getTrainingplanPostById(@PathVariable Long id) {
       return trainingPlanPostService.getTrainingPlanById(id);
    }

    @PostMapping("/miperfil/crearplanentrenamiento")
    @ResponseBody
    public TrainingPlanPost createTrainingPlanPost(@RequestBody TrainingPlanPost trainingPlanPost) {
        return trainingPlanPostService.createTrainingPlan(trainingPlanPost);
    }

    @DeleteMapping("/miperfil/crearplanentrenamiento/{id}")
    public void deleteTrainingPlanPostById(@PathVariable long id) {
        trainingPlanPostService.deleteTrainingPlanById(id);
    }


    @PutMapping("/miperfil/crearplanentrenamiento/{id}")
    public ResponseEntity<TrainingPlanPost> modifyTrainingPlanPost(@PathVariable long id, @RequestBody TrainingPlanPost newtrainingplan) {

        Optional<TrainingPlanPost> optionalExisting = trainingPlanPostService.getTrainingPlanById(id);
        if (optionalExisting.isEmpty()) {
            return ResponseEntity.notFound().build();
        }//si no lo encuentra, entonces tira un error 404. Pero no va a lanzar una exception

        TrainingPlanPost existente = optionalExisting.get();
        existente.setDia1(newTrainingplan.getDia1());
        existente.setDia2(newTrainingplan.getDia2());
        existente.setDia3(newTrainingplan.getDia3());
        existente.setDia4(newTrainingplan.getDia4());
        existente.setDia5(newTrainingplan.getDia5());
        existente.setDia6(newTrainingplan.getDia6());
        existente.setDia7(newTrainingplan.getDia7());

        TrainingPlanPost updated = trainingPlanPostService.modifyTrainingPlan(existente);
        return ResponseEntity.ok(updated);
    }

}