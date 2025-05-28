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

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("http://localhost:3000")
public class GoalController {

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
        Double progress = goalService.getCurrentProgress(currentUser.getId(), goal.getType());
        goal.setProgress(progress != null ? progress.intValue() : 0);
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
        Double progress = goalService.getCurrentProgress(currentUser.getId(), goal.getType());

        goal.setProgress(progress != null ? progress.intValue() : 0);
       // goal.setProgress(updatedGoal.getProgress());
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
    public ResponseEntity<List<Goal>> getUserGoals(
            @ModelAttribute("currentUser") Usuario currentUser) {
        List<Goal> goals = goalService.listAllGoalsOfUser(currentUser.getId());
        return ResponseEntity.ok(goals);
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
