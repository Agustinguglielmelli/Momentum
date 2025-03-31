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

    public Usuario crearUsuario(Usuario Usuario) {
        return personRepository.save(Usuario);
    }

    public void borrarUsuario(Long id) {
        personRepository.deleteById(id);
    }

    public Usuario buscarUsuarioPorNombre(String username) {
        Optional<Usuario> usuario = personRepository.findByUsername(username);
        return usuario.orElse(null);

    }

    public void modificarUsuario(Usuario usuario) {
        personRepository.save(usuario);
        //tal vez agregar algo especifico sobre como modificar usuarios
        //.save() en el caso de que no existe la crea y si existe la modifica
    }
}