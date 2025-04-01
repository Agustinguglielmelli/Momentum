package com.Momentum.Momentum.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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
    @GetMapping("/usuario/{username}")
    @ResponseBody
    public Usuario getUsuarioPorNombre(@PathVariable String username) {
        return personService.searchUserByName(username);
    }

    @PutMapping("/usuario")
    public void modificarUsuario(@RequestBody Usuario person) {
        personService.modifyUser(person);
    }

}