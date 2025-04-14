package com.Momentum.Momentum.recreationalpost;

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
    public List<RecreationalPost> getAllRecPosts(){
        return recreationalPostService.listAllPosts();
    }

    @GetMapping("/usuario/{id}")
    public Optional<RecreationalPost> getRecPostById(@PathVariable Long id) {
       return recreationalPostService.getPostById(id);
    }

    @PostMapping("/usuario")
    @ResponseBody
    public RecreationalPost createRecPost(@RequestBody RecreationalPost recpost) {
        return recreationalPostService.createRecPost(recpost);
    }

    @DeleteMapping("/usuario/{id}")
    public void deleteRecPost(@PathVariable long id) {
        recreationalPostService.deleteRecPostById(id);
    }


    @PutMapping("/usuario/{id}")
    public ResponseEntity<RecreationalPost> modificarRecPost(@PathVariable long id, @RequestBody RecreationalPost newrecpost) {

        Optional<RecreationalPost> post = recreationalPostService.getRecPostById(id);

        RecreationalPost existente = post.get();

        existente.setDescription(newrecpost.getDescription());
        existente.setPostingPicture(newrecpost.getPostingPicture());


        RecreationalPost nuevoRecpost = recreationalPostService.modifyRecPost(existente);

        return ResponseEntity.ok(nuevoRecpost);
    }

    @GetMapping("/me")
    public ResponseEntity<Usuario> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Usuario currentUser = (Usuario) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }
}