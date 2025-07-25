package com.Momentum.Momentum.goal;


import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.recreationalpost.RecreationalPostRepository;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import com.Momentum.Momentum.usuario.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin("http://localhost:3000")
public class GoalController {
    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Autowired
    UsuarioRepository repository;

    @Autowired
    private RecreationalPostRepository recPostRepository;

    @Autowired
    private GoalService goalService;

   @ModelAttribute("currentUser")
   public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();  // Devuelve el usuario autenticado
   }

    @PostMapping("goals")
    public Goal createGoal(@ModelAttribute("currentUser") Usuario currentUser,
    @RequestBody Goal goal){
        goal.setUsuario(currentUser);
        goal.setProgress(0);
       return goalService.createGoal(goal);
    }
    @PutMapping("/goals/{id}")
    public ResponseEntity<Goal> updateGoal(
            @PathVariable long id,
            @RequestBody Goal updatedGoal) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Optional<Usuario> currentUserOptional = usuarioRepository.findByEmail(username);

        if (currentUserOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Usuario currentUser = currentUserOptional.get();

        Optional<Goal> existingGoal = goalService.getGoalById(id);
        if (existingGoal.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Goal goal = existingGoal.get();
        if (!(goal.getUsuario().getId() == currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        // Verificar si el objetivo ya está completado ANTES de actualizar
        boolean wasCompleted = goal.getProgress() >= goal.getTarget();

        // Solo actualizar el progreso si NO estaba completado
        if (!wasCompleted) {
            Double progress = goalService.getCurrentProgress(
                    currentUser.getId(),
                    goal.getType(),
                    goal.getCreationDate(),
                    false // isCompleted = false porque no estaba completado
            );

            // Limitar el progreso al nuevo target si es necesario
            int newProgress = progress != null ?
                    Math.min(progress.intValue(), updatedGoal.getTarget()) : 0;
            goal.setProgress(newProgress);
        }
        // Si ya estaba completado, no tocar el progreso

        // Siempre permitir actualizar color y target
        goal.setColor(updatedGoal.getColor());
        goal.setTarget(updatedGoal.getTarget());

        Goal savedGoal = goalService.updateGoal(goal);
        return ResponseEntity.ok(savedGoal);
    }


    /*@GetMapping("/goals")
    public List<Goal> getAllGoals(@ModelAttribute("currentUser") Usuario currentUser){
        return goalService.listAllGoalsOfUser(currentUser.getId());
    }*/
    @GetMapping("myGoals")
    public ResponseEntity<Map<String, List<Goal>>> getUserGoals(
            @ModelAttribute("currentUser") Usuario currentUser) {

        // Primero actualizar el progreso de los objetivos no completados
        List<Goal> allGoals = goalService.listAllGoalsOfUser(currentUser.getId());

        for (Goal goal : allGoals) {
            boolean isCompleted = goal.getProgress() >= goal.getTarget();
            if (!isCompleted) {
                Double currentProgress = goalService.getCurrentProgress(
                        currentUser.getId(),
                        goal.getType(),
                        goal.getCreationDate(),
                        isCompleted
                );
                if (currentProgress != null) {
                    goal.setProgress(Math.min(currentProgress.intValue(), goal.getTarget()));
                    goalService.updateGoal(goal);
                }
            }
        }

        // Separar en completados y en progreso
        List<Goal> inProgress = goalService.getInProgressGoals(currentUser.getId());
        List<Goal> completed = goalService.getCompletedGoals(currentUser.getId());

        Map<String, List<Goal>> groupedGoals = new HashMap<>();
        groupedGoals.put("IN_PROGRESS", inProgress);
        groupedGoals.put("COMPLETED", completed);

        return ResponseEntity.ok(groupedGoals);
    }

    @GetMapping("/users/{userId}/progress/goals/kmran")
    public ResponseEntity<Double> getKmRanProgress(
            @PathVariable long userId,
            @ModelAttribute("currentUser") Usuario currentUser) {

        // Verify permissions if needed
        if (userId != currentUser.getId()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Double totalKm = recPostRepository.getTotalDistanceByUserId(userId);
        return ResponseEntity.ok(totalKm != null ? totalKm : 0.0);
    }
    @GetMapping("/users/{userId}/progress/goals/kmranWithDate")
    public ResponseEntity<Double> getKmRanProgressWithDate(
            @PathVariable long userId,
            @RequestParam long goalId,
            @ModelAttribute("currentUser") Usuario currentUser) {

        if (userId != currentUser.getId()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Optional<Goal> goalOptional = goalRepository.findById(goalId);
        if (goalOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Goal goal = goalOptional.get();
        if (goal.getUsuario().getId() != userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        // Si ya está completado, devolver el progreso actual sin actualizarlo
        if (goal.getProgress() >= goal.getTarget()) {
            return ResponseEntity.ok((double) goal.getProgress());
        }

        // Si no está completado, calcular y limitar al target
        Double totalKm = recPostRepository.getTotalDistanceByUserIdWithDate(userId, goal.getCreationDate());
        double limitedProgress = Math.min(totalKm != null ? totalKm : 0.0, goal.getTarget());

        return ResponseEntity.ok(limitedProgress);
    }

    @GetMapping("/types")
    public ResponseEntity<List<String>> getGoalTypes() {
        List<String> types = List.of("RUNNING", "CALORIES", "EVENTS", "FRIENDS", "GOALS");
        return ResponseEntity.ok(types);
    }

    @DeleteMapping("/goals/{id}")
    public ResponseEntity<Void> deleteGoal(
            @PathVariable long id) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Optional<Usuario> currentUserOptional = usuarioRepository.findByEmail(username);

        if (currentUserOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Usuario currentUser = currentUserOptional.get();

        Optional<Goal> goal = goalService.getGoalById(id);
        if (goal.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        if (!(goal.get().getUsuario().getId() == (currentUser.getId()))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        goalService.deleteGoal(id);
        return ResponseEntity.noContent().build();
    }



}
