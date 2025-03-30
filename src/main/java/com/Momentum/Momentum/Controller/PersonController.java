package com.Momentum.Momentum.Controller;

import com.Momentum.Momentum.Domain.Person;
import com.Momentum.Momentum.Service.PersonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;


@RestController
public class PersonController {

    @Autowired
    PersonService personService;

    @GetMapping("/usuario")
    @ResponseBody
    public List<Person> getAllUsuarios(){
        return personService.listarUsuarios;
    }

    @PostMapping("/usuario")
    @ResponseBody
    public Person createUsuario(@RequestBody Person person) {
        return personService.crearUsuario(person);
    }

    @DeleteMapping("/usuario/{id}")
    public void deleteUsuario(@PathVariable long id) {
        personService.borrarUsuario(id);
    }
    @GetMapping("/usuario/{username}")
    @ResponseBody
    public Person getUsuarioPorNombre(@PathVariable String username) {
        return personService.buscarUsuarioPorNombre(username);
    }

    @PutMapping("/usuario")
    public void modificarUsuario(@RequestBody Person person) {
        personService.modificarUsuario(person);
    }

}