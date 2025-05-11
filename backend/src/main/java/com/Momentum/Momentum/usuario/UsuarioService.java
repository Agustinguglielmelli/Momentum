package com.Momentum.Momentum.usuario;


import com.Momentum.Momentum.event.Event;
import com.Momentum.Momentum.event.EventRepository;
import com.Momentum.Momentum.recreationalpost.RecreationalPostRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@org.springframework.stereotype.Service
public class UsuarioService {
    @Autowired
    RecreationalPostRepository recreationalPostRepository;

    @Autowired
    UsuarioRepository personRepository;

    @Autowired
    private EventRepository eventRepository;


    public List<Usuario> listarUsuarios() {
        return personRepository.findAll();
    }

    public Usuario createUser(Usuario Usuario) {
        return personRepository.save(Usuario);
    }

    public void deleteUserById(Long userId) {
        personRepository.deleteById(userId);
    }


    public Optional<Usuario> getUserById(Long id) {
        return personRepository.findById(id);
    }

    public Usuario modifyUser(Usuario usuario) {
        return personRepository.save(usuario);
    }

    public Set<Event> listUserEvents(Long id) {
        return eventRepository.findByCreadorId(id);
    }

    public List<Usuario> searchUsers(String nameSearch) {
       return personRepository.findByUsernameStartingWithIgnoreCase(nameSearch);
    }
   /* // public UsuarioProfileDto getUserProfile(Long id) {
       // Usuario usuario = personRepository.findById(id)
        //        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    
        int cantFollowers = usuario.getFollowers().size();
        int cantFollowing = usuario.getFollowing().size();
    
        return new UsuarioProfileDto(
            usuario.getuserUsername(),
            usuario.getId(),
            usuario.getProfilePicture(),
            cantFollowers,
            cantFollowing
        ); */

    public double getTotalKmForUser(Long userId) {
       Double total = recreationalPostRepository.getTotalDistanceByUserId(userId);
       return total != null ? total : 0.0;
    }

    public List<UsuarioConKmsDto> getFollowedUsersByKms(Usuario usuario) {
        List<Object[]> rawResults = personRepository.findFollowedUsersAndKms(usuario);

        return rawResults.stream()
                .map(obj -> {
                    Usuario seguido = (Usuario) obj[0];
                    Double kms = (Double) obj[1];

                    UsuarioDto dto = new UsuarioDto(
                            seguido.getUsername(),
                            seguido.getId(),
                            seguido.getProfilePicture(),
                            seguido.displayUserName()
                    );

                    return new UsuarioConKmsDto(dto, kms);
                })
                .toList();
    }




}
