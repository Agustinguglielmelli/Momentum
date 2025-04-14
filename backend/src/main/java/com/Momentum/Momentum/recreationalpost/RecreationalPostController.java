package com.Momentum.Momentum.recreationalpost;

import com.Momentum.Momentum.image.Image;
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
public class RecreationalPostController {

    @Autowired
    RecreationalPostService recreationalPostService;

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();  // Devuelve el usuario autenticado
    }

    @GetMapping("/miperfil/recPost")
    public List<RecreationalPost> getAllRecPosts(@ModelAttribute("currentUser") Usuario currentUser){
        return recreationalPostService.listAllRecPostsOfUser(currentUser.getId());
    }

    @GetMapping("/miperfil/recPost/{id}")
    public Optional<RecreationalPost> getRecPostById(@PathVariable Long id) {
       return recreationalPostService.getRecPostById(id);
    }

    @PostMapping("/miperfil/recPost")
    public RecreationalPost createRecPost(@RequestBody RecreationalPost recpost, @ModelAttribute("currentUser") Usuario currentUser) {
        recpost.setUsuario(currentUser);

        if (recpost.getImages() != null) {
            for (Image img : recpost.getImages()) {
                img.setRecreationalPost(recpost);
            }
        }

        return recreationalPostService.createRecPost(recpost);
    }

    @DeleteMapping("/miperfil/recPost/{id}")
    public ResponseEntity<Void> deleteRecPost(@PathVariable long id, @ModelAttribute("currentUser") Usuario currentUser) {
        Optional<RecreationalPost> optional = recreationalPostService.getRecPostById(id);
        if (optional.isEmpty() || optional.get().getUsuario().getId() != currentUser.getId()) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        recreationalPostService.deleteRecPostById(id);
        return ResponseEntity.ok().build();
    }


    @PutMapping("/miperfil/recPost/{id}")
    public ResponseEntity<RecreationalPost> modificarRecPost(@PathVariable long id, @RequestBody RecreationalPost newrecpost,
                                                             @ModelAttribute("currentUser") Usuario currentUser) {

        Optional<RecreationalPost> post = recreationalPostService.getRecPostById(id);

        if (post.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        RecreationalPost existente = post.get();

        existente.setDescription(newrecpost.getDescription());
        existente.setCalories(newrecpost.getCalories());
        existente.setDistance(newrecpost.getDistance());
        existente.setDuration(newrecpost.getDuration());

        if (existente.getUsuario() == null || existente.getUsuario().getId() != currentUser.getId()) {
            return ResponseEntity.status(403).build(); // 403 Forbidden
        }

        RecreationalPost nuevoRecpost = recreationalPostService.modifyRecPost(existente);

        return ResponseEntity.ok(nuevoRecpost);
    }
}