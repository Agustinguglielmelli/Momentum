package com.Momentum.Momentum.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("http://localhost:3000")
public class Controller {

    @Autowired
    Service personService;

    @GetMapping("/usuario")
    @ResponseBody
    public List<Usuario> getAllUsuarios(){
        return personService.listarUsuarios();
    }

    @PostMapping("/usuario")
    @ResponseBody
    public Usuario createUsuario(@RequestBody Usuario person) {
        return personService.createUser(person);
    }

    @DeleteMapping("/usuario/{id}")
    public void deleteUsuario(@PathVariable long id) {
        personService.deleteUserById(id);
    }


    @PutMapping("/usuario/{id}")
    public ResponseEntity<Usuario> modificarUsuario(@PathVariable long id, @RequestBody Usuario person) {

        Optional<Usuario> usuario = personService.getUserById(id);

        Usuario existente = usuario.get();

        existente.setUsername(person.getUsername());
        existente.setEmail(person.getEmail());
        existente.setPassword(person.getPassword());
        existente.setProfile_picture(person.getProfile_picture());


        Usuario nuevoUsuario = personService.modifyUser(existente);

        return ResponseEntity.ok(nuevoUsuario);
    }

}