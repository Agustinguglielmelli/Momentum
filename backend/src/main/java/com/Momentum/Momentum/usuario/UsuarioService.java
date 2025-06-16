package com.Momentum.Momentum.usuario;


import com.Momentum.Momentum.email.EmailService;
import com.Momentum.Momentum.event.Event;
import com.Momentum.Momentum.event.EventRepository;
import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.recreationalpost.RecreationalPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
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

    @Autowired
    private EmailService emailService;



    public List<Usuario> listarUsuarios() {
        return personRepository.findAll();
    }

    //public Usuario createUser(Usuario Usuario) {
        //return personRepository.save(Usuario);
    //}
    public Usuario createUser(Usuario usuario) {

        Usuario savedUser = personRepository.save(usuario);

        notifyUserCreated(savedUser);

        return savedUser;
    }

    private void notifyUserCreated(Usuario user) {
        String subject = "Bienvenido a Momentum";
        String text = "Hola " + user.getUsername() + ",\n\n" +
                "Gracias por registrarte en Momentum. ¡Disfruta la app!\n\n" +
                "Saludos,\nEquipo Momentum";
        try {
            emailService.sendSimpleEmail(user.getEmail(), subject, text);
        } catch (Exception e) {
            System.err.println("Error enviando mail de bienvenida: " + e.getMessage());
        }
    }

    @Transactional // se realiza completa la operacion o no se realiza en absoluto
    public void deleteUserById(Usuario user) {
        Optional<Usuario> optionalUsuario = personRepository.findById(user.getId());
        if (optionalUsuario.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }
        Usuario usuario = optionalUsuario.get();

        // Eliminar relaciones de followers
        for (Usuario follower : new HashSet<>(usuario.getFollowers())) {
            follower.getFollowing().remove(usuario);
        }
        usuario.getFollowers().clear();

        // Eliminar relaciones de following
        for (Usuario followed : new HashSet<>(usuario.getFollowing())) {
            followed.getFollowers().remove(usuario);
        }
        usuario.getFollowing().clear();

        // eliminar el usuario como participante de eventos
        for (Event evento : usuario.getEventsImIn()) {
            evento.getParticipantes().remove(usuario);
        }

        personRepository.deleteById(user.getId());
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
        Optional<Usuario> userOptional = personRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }
        Usuario user = userOptional.get();
       Double total = personRepository.getTotalDistanceByUsuario(user);
       return total != null ? total : 0.0;
    }

    public List<UsuarioConKmsDto> getFollowedUsersByKms(Usuario usuario) {
        List<Object[]> rawResults = personRepository.findFollowedUsersAndKms(usuario);

        Double kmsUserLogged = recreationalPostRepository.getTotalDistanceByUserId(usuario.getId());
        if (kmsUserLogged == null) {
            kmsUserLogged = 0.0;
        }

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
