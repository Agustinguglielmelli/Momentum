package com.Momentum.Momentum.goal;


import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    UsuarioRepository repository;


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
         return goalService.createGoal(goal);
    }
    @PutMapping("/goals/{id}")
    public ResponseEntity<Goal> updateGoal(@PathVariable long id,
     @ModelAttribute("currentUser") Usuario currentUser, @RequestBody Goal newGoal){
        Optional<Goal> goal = goalService.getGoalById(id);

        if(goal.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Goal existente = goal.get();

        existente.setId(newGoal.getId());
        existente.setColor(newGoal.getColor());
        existente.setProgress(newGoal.getProgress());
        existente.setCreationDate(newGoal.getCreationDate());

        if (existente.getUsuario() == null || existente.getUsuario().getId() != currentUser.getId()) {
            return ResponseEntity.status(403).build(); // 403 Forbidden
        }
        Goal nuevaGoal = goalService.updateGoal(existente);

        return ResponseEntity.ok(nuevaGoal);

    }

    @GetMapping("/goals")
    public List<Goal> getAllGoals(@ModelAttribute("currentUser") Usuario currentUser){
        return goalService.listAllGoalsOfUser(currentUser.getId());
    }

}
