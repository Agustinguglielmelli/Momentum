package com.Momentum.Momentum.recreationalpost;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("http://localhost:3000/miperfil")
public class RecreationalPostController {

    @Autowired
    RecreationalPostService recreationalPostService;

    @GetMapping("/miperfil")
    @ResponseBody
    public List<RecreationalPost> getAllRecPosts(){
        return recreationalPostService.listAllPosts();
    }

    @GetMapping("/miperfil/{id}")
    public Optional<RecreationalPost> getRecPostById(@PathVariable Long id) {
       return recreationalPostService.getPostById(id);
    }

    @PostMapping("/miperfil")
    @ResponseBody
    public RecreationalPost createRecPost(@RequestBody RecreationalPost recpost) {
        return recreationalPostService.createRecPost(recpost);
    }

    @DeleteMapping("/miperfil/{id}")
    public void deleteRecPost(@PathVariable long id) {
        recreationalPostService.deleteRecPostById(id);
    }


    @PutMapping("/miperfil/{id}")
    public ResponseEntity<RecreationalPost> modificarRecPost(@PathVariable long id, @RequestBody RecreationalPost newrecpost) {

        Optional<RecreationalPost> post = recreationalPostService.getRecPostById(id);

        RecreationalPost existente = post.get();

        existente.setDescription(newrecpost.getDescription());
        existente.setPostingPicture(newrecpost.getPostingPicture());


        RecreationalPost nuevoRecpost = recreationalPostService.modifyRecPost(existente);

        return ResponseEntity.ok(nuevoRecpost);
    }
}