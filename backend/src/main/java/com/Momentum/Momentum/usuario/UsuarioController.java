package com.Momentum.Momentum.usuario;

import com.Momentum.Momentum.event.Event;
import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.recreationalpost.RecreationalPostService;
import com.Momentum.Momentum.trainingplanpost.TrainingPlanPost;
import com.Momentum.Momentum.trainingplanpost.TrainingPlanPostService;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@CrossOrigin(origins ="http://localhost:3000")
public class UsuarioController {

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();  // Devuelve el usuario autenticado
    }

    @Autowired
    UsuarioService personUsuarioService;

    @Autowired
    UsuarioRepository repository;

    @Autowired
    RecreationalPostService recreationalPostService;

    @Autowired
    TrainingPlanPostService trainingPlanPostService;

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

    @GetMapping("/usuario/search")
    public List<UsuarioDto> getUsersByName(@RequestParam String nameSearch){
        List<Usuario> users = personUsuarioService.searchUsers(nameSearch);
        return users.stream().map(
                u -> new UsuarioDto(
                        u.getUsername(),
                        u.getId(),
                        u.getProfilePicture()
                )
                ).collect(Collectors.toList());
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

    /*--------------------- ENDPOINTS DE SGUIDOS Y SEGUIDRORES --------------------------*/
    @PostMapping("/usuario/follow/{id}")
    public ResponseEntity<?> followUser(@PathVariable long id) {
        // Obtener el usuario directamente desde la autenticación y la base de datos
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        Optional<Usuario> currentUserOpt = repository.findByEmail(userEmail);

        if (currentUserOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no autenticado");
        }

        Usuario currentUser = currentUserOpt.get();
        System.out.println("Usuario actual (obtenido directamente): ID=" + currentUser.getId() + ", Email=" + currentUser.getEmail());
        System.out.println("Usuario a seguir ID: " + id);

        if (currentUser.getId() == id) {
            return ResponseEntity.badRequest().body("No puedes seguirte a ti mismo");
        }

        Optional<Usuario> userToFollow = personUsuarioService.getUserById(id);
        if (userToFollow.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }

        Usuario follower = currentUser;
        Usuario followed = userToFollow.get();

        // Añadir a la lista de seguidos
        follower.getFollowing().add(followed);
        personUsuarioService.modifyUser(follower);

        return ResponseEntity.ok().body("Usuario seguido correctamente");
    }


    @GetMapping("/usuario/listUserDto") // listar usuarios en la barra de buscar
    public Set<UsuarioDto> listUserDto(@ModelAttribute("currentUser") Usuario currentUser) {
        List<Usuario> users = personUsuarioService.listarUsuarios();
        return users.stream().map(p -> new UsuarioDto(
                p.getUsername(),
                p.getId(),
                p.getProfilePicture())
        ).collect(Collectors.toSet());
    }

    @DeleteMapping("/usuario/unfollow/{id}")
    public ResponseEntity<?> unfollowUser(@PathVariable long id) {
        // Obtener el usuario directamente desde la autenticación y la base de datos
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        Optional<Usuario> currentUserOpt = repository.findByEmail(userEmail);

        if (currentUserOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no autenticado");
        }

        Usuario currentUser = currentUserOpt.get();
        System.out.println("Usuario actual (unfollow): ID=" + currentUser.getId() + ", Email=" + currentUser.getEmail());
        System.out.println("Usuario a dejar de seguir ID: " + id);

        Optional<Usuario> userToUnfollow = personUsuarioService.getUserById(id);
        if (userToUnfollow.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }

        Usuario follower = currentUser;
        Usuario followed = userToUnfollow.get();

        // Verificar si realmente lo sigue
        boolean isFollowing = follower.getFollowing().stream()
                .anyMatch(u -> u.getId() == followed.getId());

        if (!isFollowing) {
            return ResponseEntity.badRequest().body("No sigues a este usuario");
        }

        // Eliminar de la lista de seguidos
        follower.getFollowing().remove(followed);
        personUsuarioService.modifyUser(follower);

        return ResponseEntity.ok().body("Has dejado de seguir al usuario");
    }

    @GetMapping("/usuario/following")
    public ResponseEntity<Set<UsuarioDto>> getFollowing() {
        // Obtener el usuario actual
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        Optional<Usuario> currentUserOpt = repository.findByEmail(userEmail);

        if (currentUserOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Usuario currentUser = currentUserOpt.get();

        // Obtener usuario fresco para asegurar que tenemos los datos actualizados
        Usuario user = personUsuarioService.getUserById(currentUser.getId()).orElseThrow();

        // Convertir la lista de seguidos a DTO
        Set<UsuarioDto> followingDto = user.getFollowing().stream()
                .map(u -> new UsuarioDto(
                        u.getUsername(),
                        u.getId(),
                        u.getProfilePicture()))
                .collect(Collectors.toSet());

        return ResponseEntity.ok(followingDto);
    }

    @GetMapping("/usuario/followers")
    public ResponseEntity<Set<UsuarioDto>> getFollowers() {
        // Obtener el usuario actual
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        Optional<Usuario> currentUserOpt = repository.findByEmail(userEmail);

        if (currentUserOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Usuario currentUser = currentUserOpt.get();

        // Obtener usuario fresco para asegurar que tenemos los datos actualizados
        Usuario user = personUsuarioService.getUserById(currentUser.getId()).orElseThrow();

        // Convertir la lista de seguidores a DTO
        Set<UsuarioDto> followersDto = user.getFollowers().stream()
                .map(u -> new UsuarioDto(
                        u.getUsername(),
                        u.getId(),
                        u.getProfilePicture()))
                .collect(Collectors.toSet());

        return ResponseEntity.ok(followersDto);
    }

    @GetMapping("/usuario/isFollowing/{id}") // es para ver si estas siguiendo a cierto usuario
    public ResponseEntity<Boolean> isFollowing(@PathVariable long id) {
        // Obtener el usuario actual
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        Optional<Usuario> currentUserOpt = repository.findByEmail(userEmail);

        if (currentUserOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Usuario currentUser = currentUserOpt.get();

        // Verificar que exista el usuario a consultar
        Optional<Usuario> userToCheck = personUsuarioService.getUserById(id);
        if (userToCheck.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }

        // Verificar si el usuario actual sigue al usuario con el ID proporcionado
        boolean isFollowing = currentUser.getFollowing().stream()
                .anyMatch(u -> u.getId() == id);

        return ResponseEntity.ok(isFollowing);
    }

    @GetMapping("/usuario/recreationalPostsFollowing")
    public List<RecreationalPost> getRecreationalPostsFollowing() {
        // Obtener el usuario actual
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        Optional<Usuario> currentUserOpt = repository.findByEmail(userEmail);

        if (currentUserOpt.isEmpty()) {
            return List.of();
        }
        Usuario currentUser = currentUserOpt.get();
        Set<Usuario> following = currentUser.getFollowing(); // busco los usuarios que sigo

        // Obtener todos los posts de los usuarios que sigue
        List<RecreationalPost> posts = following.stream()
                .flatMap(user -> recreationalPostService.getPostsByUserId(user.getId()).stream())
                .collect(Collectors.toList());

        return posts;


    }
    @GetMapping("/usuario/trainingPlanPostsFollowing")
    public List<TrainingPlanPost> getTrainingPlanPostsFollowing() {
        // Obtener el usuario actual
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        Optional<Usuario> currentUserOpt = repository.findByEmail(userEmail);

        if (currentUserOpt.isEmpty()) {
            return List.of();
        }
        Usuario currentUser = currentUserOpt.get();
        Set<Usuario> following = currentUser.getFollowing(); // busco los usuarios que sigo

        // Obtener todos los posts de los usuarios que sigue
        List<TrainingPlanPost> posts = following.stream()
                .flatMap(user -> trainingPlanPostService.getPostsByUserId(user.getId()).stream())
                .collect(Collectors.toList());

        return posts;
    }
   // @GetMapping("/{userId}/profile")
   // public ResponseEntity<UsuarioProfileDto> getUserProfile(@PathVariable Long userId) {
       // UsuarioProfileDto profile = usuarioService.getUserProfile(userId);
       // return ResponseEntity.ok(profile);
    //}
}