package com.Momentum.Momentum.usuario;

import com.Momentum.Momentum.event.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@RestController
@CrossOrigin("http://localhost:3000")
public class UsuarioController {

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();  // Devuelve el usuario autenticado
    }

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
        existente.setProfilePicture(person.getProfilePicture());


        Usuario nuevoUsuario = personUsuarioService.modifyUser(existente);

        return ResponseEntity.ok(nuevoUsuario);
    }

    @GetMapping ("/usuario/events")
    public Set<Event> getUserEvents(@ModelAttribute("currentUser") Usuario currentUser){
        return personUsuarioService.listUserEvents(currentUser.getId());
    }

}