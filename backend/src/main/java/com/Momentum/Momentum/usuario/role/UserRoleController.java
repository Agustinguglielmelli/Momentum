package com.Momentum.Momentum.usuario.role;

import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import com.Momentum.Momentum.usuario.UsuarioService;
import com.Momentum.Momentum.usuario.role.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserRoleController {


    private UsuarioService usuarioService;


    private UsuarioRepository usuarioRepository;

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();
    }

    /**
     * Permite al usuario autenticado seleccionar su rol (RUNNER o COACH)
     */
    @PostMapping("/select-role")
    public ResponseEntity<String> selectRole(@RequestBody Map<String, String> request,
                                             @ModelAttribute("currentUser") Usuario currentUser) {
        String roleStr = request.get("role");

        if (roleStr == null) {
            return ResponseEntity.badRequest().body("Debe especificar un rol.");
        }

        Role selectedRole;
        try {
            selectedRole = Role.valueOf(roleStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Rol inválido. Debe ser RUNNER o COACH.");
        }

        currentUser.setRole(selectedRole);
        usuarioRepository.save(currentUser);

        return ResponseEntity.ok("Rol asignado exitosamente: " + selectedRole);
    }

    /**
     * Devuelve true si el usuario autenticado ya tiene un rol asignado.
     */
    @GetMapping("/has-role")
    public Map<String, Boolean> hasRole(@ModelAttribute("currentUser") Usuario currentUser) {
        boolean hasRole = currentUser.getRole() != null;
        return Collections.singletonMap("hasRole", hasRole);
    }
}


