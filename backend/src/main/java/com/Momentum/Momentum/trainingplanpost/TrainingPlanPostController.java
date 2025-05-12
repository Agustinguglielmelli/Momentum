
package com.Momentum.Momentum.trainingplanpost;

import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000/miperfil")
public class TrainingPlanPostController {

    @Autowired
    TrainingPlanPostService trainingPlanPostService;

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();  // Devuelve el usuario autenticado
    }

    @GetMapping("/miperfil/trainingPlan")
    public List<TrainingPlanPost> getAllTrainingPlans(@ModelAttribute("currentUser") Usuario currentUser){
        return trainingPlanPostService.listTrainingPlansOfUser(currentUser.getId());
    }

    @GetMapping("/miperfil/trainingPlan/{id}")
    public Optional<TrainingPlanPost> getTrainingplanPostById(@PathVariable Long id) {
       return trainingPlanPostService.getTrainingPlanById(id);
    }

    @PostMapping("/miperfil/trainingPlan")
    public TrainingPlanPost createTrainingPlanPost(@RequestBody TrainingPlanPost trainingPlanPost, @ModelAttribute("currentUser") Usuario currentUser) {
        trainingPlanPost.setUsuario(currentUser);
        return trainingPlanPostService.createTrainingPlan(trainingPlanPost);
    }

    @DeleteMapping("/miperfil/trainingPlan/{id}")
    public ResponseEntity<Void> deleteTrainingPlanPostById(@PathVariable long id, @ModelAttribute("currentUser") Usuario currentUser) {
        Optional<TrainingPlanPost> optional = trainingPlanPostService.getTrainingPlanById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        trainingPlanPostService.deleteTrainingPlanById(id);
        return ResponseEntity.ok().build();
    }


    @PutMapping("/miperfil/trainingPlan/{id}")
    public ResponseEntity<TrainingPlanPost> modifyTrainingPlanPost(@PathVariable long id, @RequestBody TrainingPlanPost newTrainingplan,
                                                                   @ModelAttribute("currentUser") Usuario currentUser) {

        Optional<TrainingPlanPost> optionalExisting = trainingPlanPostService.getTrainingPlanById(id);

        if (optionalExisting.isEmpty()) {
            return ResponseEntity.notFound().build();
        } // si no lo encuentra, entonces tira un error 404. Pero no va a lanzar una exception

        TrainingPlanPost existente = optionalExisting.get();
        existente.setDia1(newTrainingplan.getDia1());
        existente.setDia2(newTrainingplan.getDia2());
        existente.setDia3(newTrainingplan.getDia3());
        existente.setDia4(newTrainingplan.getDia4());
        existente.setDia5(newTrainingplan.getDia5());
        existente.setDia6(newTrainingplan.getDia6());
        existente.setDia7(newTrainingplan.getDia7());
        existente.setDescription(newTrainingplan.getDescription());
        existente.setDuration(newTrainingplan.getDuration());
        existente.setFrequency(newTrainingplan.getFrequency());
        existente.setTitle(newTrainingplan.getTitle());

        if (existente.getUsuario() == null || existente.getUsuario().getId() != currentUser.getId()) {
            return ResponseEntity.status(403).build(); // 403 Forbidden
        }

        TrainingPlanPost updated = trainingPlanPostService.modifyTrainingPlan(existente);
        return ResponseEntity.ok(updated);
    }

}