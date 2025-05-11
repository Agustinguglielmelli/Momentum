package com.Momentum.Momentum.usuario;


import com.Momentum.Momentum.event.Event;
import com.Momentum.Momentum.event.EventRepository;
import com.Momentum.Momentum.recreationalpost.RecreationalPostRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.AbstractMap;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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

        Double kmsUserLogged = recreationalPostRepository.getTotalDistanceByUserId(usuario.getId());

        Object[] selfEntry = new Object[]{usuario, kmsUserLogged};
        rawResults.add(selfEntry);

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

    public List<UsuarioConEventosDto> getFollowingEventsCompleted(Usuario loggedUser) {
        Set<Usuario> users = new HashSet<>(loggedUser.getFollowing());
        users.add(loggedUser);

        return users.stream()
                .map(usuario -> {
                    long eventosCompletados = usuario.getEventsImIn().stream()
                            .filter(event -> {
                                try {
                                    LocalDate fechaEvento = LocalDate.parse(event.getDate());
                                    return fechaEvento.isBefore(LocalDate.now());
                                } catch (Exception e) {
                                    return false;
                                }
                            })
                            .count();

                    UsuarioDto usuarioDto = new UsuarioDto(
                            usuario.getuserUsername(),
                            usuario.getId(),
                            usuario.getProfilePicture(),
                            usuario.displayUserName()
                    );

                    return new UsuarioConEventosDto(usuarioDto, eventosCompletados);
                })
                .sorted(Comparator.comparingLong(UsuarioConEventosDto::getEventosCompletados).reversed())
                .collect(Collectors.toList());
    }



}
