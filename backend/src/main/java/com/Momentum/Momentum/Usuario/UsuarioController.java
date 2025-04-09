package com.Momentum.Momentum.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("http://localhost:3000")
public class UsuarioController {

    @Autowired
    UsuarioService personUsuarioService;

    @GetMapping("/usuario")
    @ResponseBody
    public List<Usuario> getAllUsuarios(){
        return personUsuarioService.listarUsuarios();
    }

    @GetMapping("/usuario/{id}")
    public Optional<Usuario> getUsuarioById(@PathVariable Long id) {
       return personUsuarioService.getUserById(id);
    }

    @PostMapping("/usuario")
    @ResponseBody
    public Usuario createUsuario(@RequestBody Usuario person) {
        return personUsuarioService.createUser(person);
    }

    @DeleteMapping("/usuario/{id}")
    public void deleteUsuario(@PathVariable long id) {
        personUsuarioService.deleteUserById(id);
    }


    @PutMapping("/usuario/{id}")
    public ResponseEntity<Usuario> modificarUsuario(@PathVariable long id, @RequestBody Usuario person) {

        Optional<Usuario> usuario = personUsuarioService.getUserById(id);

        Usuario existente = usuario.get();

        existente.setUsername(person.getUsername());
        existente.setEmail(person.getEmail());
        existente.setPassword(person.getPassword());
        existente.setProfile_picture(person.getProfile_picture());


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