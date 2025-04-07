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


    public Optional<Usuario> getUserById(Long id) {
        return personRepository.findById(id);
    }

    public Usuario modifyUser(Usuario usuario) {
        return personRepository.save(usuario);
    }
}