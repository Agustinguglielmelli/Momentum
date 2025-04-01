package com.Momentum.Momentum.Usuario;


import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class Service {

    @Autowired
    Repository personRepository;


    public List<Usuario> listarUsuarios() {
        return personRepository.findAll();
    }

    public Usuario createUser(Usuario Usuario) {
        return personRepository.save(Usuario);
    }

    public void deleteUserById(Long id) {
        personRepository.deleteById(id);
    }

    public Usuario searchUserByName(String username) {
        Optional<Usuario> usuario = personRepository.findByUsername(username);
        return usuario.orElse(null);

    }

    public void modifyUser(Usuario usuario) {
        personRepository.save(usuario);
        //tal vez agregar algo especifico sobre como modificar usuarios
        //.save() en el caso de que no existe la crea y si existe la modifica
    }
}