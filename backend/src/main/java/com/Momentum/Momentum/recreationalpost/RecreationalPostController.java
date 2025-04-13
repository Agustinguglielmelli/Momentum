package com.Momentum.Momentum.R;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("http://localhost:3000")
public class RecreationalPostController {

    @Autowired
    RecreationalPostService recreationalPostService;

    @GetMapping("/usuario")
    @ResponseBody
    public List<Usuario> getAllRecPosts(){
        return recreationalPostService.listAllPosts();
    }

    @GetMapping("/usuario/{id}")
    public Optional<Usuario> getRecPostById(@PathVariable Long id) {
       return recreationalPostService.getPostById(id);
    }

    @PostMapping("/usuario")
    @ResponseBody
    public Usuario createRecPost(@RequestBody RecreationalPost recpost) {
        return recreationalPostService.createRecPost(recpost);
    }

    @DeleteMapping("/usuario/{id}")
    public void deleteRecPost(@PathVariable long id) {
        recreationalPostService.deleteRecPostById(id);
    }


    @PutMapping("/usuario/{id}")
    public ResponseEntity<Usuario> modificarRecPost(@PathVariable long id, @RequestBody Usuario person) {

        Optional<RecreationalPost> post = recreationalPostService.getRecPostById(id);

        RecreationalPost existente = usuario.get();

        existente.setUsername(person.getUsername());//
        existente.setEmail(person.getEmail());
        existente.setPassword(person.getPassword());
        existente.setProfilePicture(person.getProfilePicture());


        Usuario nuevoUsuario = personUsuarioService.modifyUser(existente);

        return ResponseEntity.ok(nuevoUsuario);
    }

    @GetMapping("/me")
    public ResponseEntity<Usuario> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Usuario currentUser = (Usuario) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }
}