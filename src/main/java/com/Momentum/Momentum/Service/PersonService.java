package com.Momentum.Momentum.Service;


import com.Momentum.Momentum.Domain.Person;
import com.Momentum.Momentum.Repository.PersonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonService {
    @Autowired
    PersonRepository personRepository;


    public list<Person> listarUsuarios() {
        personRepository.findAll();
    }

    public Person crearUsuario(Person person) {
        return personRepository.save(person);
    }

    public void borrarUsuario(Long id) {
        personRepository.deleteById(id);
    }

    public Person buscarUsuarioPorNombre(String username) {
        Optional<Person> usuario = personRepository.findByUsername(username);
        return usuario.orElse(null);

    }

    public void modificarUsuario(Person person) {
        personRepository.save(person);
        //tal vez agregar algo especifico sobre como modificar usuarios
        //.save() en el caso de que no existe la crea y si existe la modifica
    }
}