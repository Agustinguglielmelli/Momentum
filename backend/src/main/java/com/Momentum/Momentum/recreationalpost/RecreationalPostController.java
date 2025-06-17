package com.Momentum.Momentum.recreationalpost;

import com.Momentum.Momentum.image.Image;
import com.Momentum.Momentum.image.ImageDto;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioDto;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("http://localhost:3000/miperfil")
public class RecreationalPostController {

    @Autowired
    RecreationalPostService recreationalPostService;


    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();  // Devuelve el usuario autenticado
    }

    @GetMapping("/miperfil/recPost")
    public List<RecPostDto> getAllRecPosts(@ModelAttribute("currentUser") Usuario currentUser){
        return recreationalPostService.listAllRecPostsOfUser(currentUser.getId());
    }

    @GetMapping("/miperfil/recPost/{id}")
    public Optional<RecreationalPost> getRecPostById(@PathVariable Long id) {
       return recreationalPostService.getRecPostById(id);
    }

    @PostMapping("/miperfil/recPost")
    public ResponseEntity<RecPostDto> createRecPost(
            @RequestBody RecPostDto postDto,
            @AuthenticationPrincipal Usuario currentUser
    ) {
        // 1. Crear entidad principal
        RecreationalPost post = new RecreationalPost();
        post.setDistance(postDto.getDistance());
        post.setDescription(postDto.getDescription());
        post.setDuration(postDto.getDuration());
        post.setCalories(postDto.getCalories());
        post.setUsuario(currentUser);

        // 2. Procesar imágenes Base64
        if (postDto.getImages() != null) {
            post.setImages(
                    postDto.getImages().stream()
                            .map(imageDto -> {
                                Image img = new Image();
                                img.setBase64Data(imageDto.getBase64Data());
                                img.setRecreationalPost(post);
                                return img;
                            })
                            .toList()
            );
        }

        // 3. Guardar en BD
        RecreationalPost savedPost = recreationalPostService.createRecPost(post);

        // 4. Implementación del método convertToDto
        RecPostDto responseDto = mapToDto(savedPost);
        return ResponseEntity.ok(responseDto);
    }

    // Método auxiliar para convertir entidad a DTO
    private RecPostDto mapToDto(RecreationalPost post) {
        RecPostDto dto = new RecPostDto();
        dto.setIdRecPost(post.getIdRecPost());
        dto.setDistance(post.getDistance());
        dto.setDescription(post.getDescription());
        dto.setDuration(post.getDuration());
        dto.setCalories(post.getCalories());
        dto.setFechaPublicacion(post.getCreationDate());

        // Convertir Usuario a UsuarioDto
        if (post.getUsuario() != null) {
            UsuarioDto usuarioDto = new UsuarioDto();
            usuarioDto.setId(post.getUsuario().getId());
            usuarioDto.setUsername(post.getUsuario().getUsername());
            usuarioDto.setDisplayUserName(post.getUsuario().displayUserName());
            dto.setUsuario(usuarioDto);
        }

        // Convertir imágenes
        if (post.getImages() != null) {
            dto.setImages(
                    post.getImages().stream()
                            .map(image -> new ImageDto(image.getId(), image.getBase64Data()))
                            .toList()
            );
        }

        return dto;
    }
    /*@PostMapping("/miperfil/recPost")
    public ResponseEntity<RecPostDto> createRecPost(
            @RequestBody RecPostDto recPostDto,
            @AuthenticationPrincipal Usuario currentUser
    ) {
        // 1. Convertir DTO a entidad
        RecreationalPost newPost = new RecreationalPost();
        newPost.setDistance(recPostDto.getDistance());
        newPost.setDescription(recPostDto.getDescription());
        newPost.setDuration(recPostDto.getDuration());
        newPost.setCalories(recPostDto.getCalories());
        newPost.setUsuario(currentUser); // Usuario autenticado

        // 2. Guardar en BD (sin imágenes inicialmente)
        RecreationalPost savedPost = recreationalPostService.createRecPost(newPost);

        // 3. Convertir la entidad guardada a DTO para la respuesta
        RecPostDto responseDto = new RecPostDto(
                savedPost.getIdRecPost(),
                savedPost.getDistance(),
                savedPost.getDescription(),
                savedPost.getDuration(),
                savedPost.getCalories(),
                convertToUsuarioDto(currentUser), // Método para convertir Usuario a UsuarioDto
                Collections.emptyList(), // Imágenes vacías inicialmente
                savedPost.getCreationDate()
        );

        return ResponseEntity.ok(responseDto);
    }


    // Método auxiliar para convertir Usuario a UsuarioDto
    private UsuarioDto convertToUsuarioDto(Usuario usuario) {
        UsuarioDto dto = new UsuarioDto();
        dto.setId(usuario.getId());
        dto.setUsername(usuario.getUsername());
        // ... otros campos necesarios
        return dto;
    }*/

    /*@PostMapping("/miperfil/recPost")
    public RecreationalPost createRecPost(
            @RequestBody RecreationalPostRequest request,
            @AuthenticationPrincipal Usuario currentUser
    ) {
        RecreationalPost recpost = new RecreationalPost();
        recpost.setDistance(request.getDistance());
        recpost.setDescription(request.getDescription());
        recpost.setDuration(request.getDuration());
        recpost.setCalories(request.getCalories());
        recpost.setUsuario(currentUser); // Asigna el usuario desde el contexto

        return recreationalPostService.createRecPost(recpost);
    }*/
    /*
    @PostMapping("/miperfil/recPost")
    public RecreationalPost createRecPost(
            @RequestBody RecreationalPost recpost,
            @AuthenticationPrincipal Usuario currentUser // Spring inyecta el usuario
    ) {
        recpost.setUsuario(currentUser);

        if (recpost.getImages() != null) {
            for (Image img : recpost.getImages()) {
                img.setRecreationalPost(recpost);
            }
        }

        return recreationalPostService.createRecPost(recpost);
    }*/
    /*
    @PostMapping("/miperfil/recPost")
    public RecreationalPost createRecPost(@RequestBody RecreationalPost recpost, @ModelAttribute("currentUser") Usuario currentUser) {
        recpost.setUsuario(currentUser);

        if (recpost.getImages() != null) {
            for (Image img : recpost.getImages()) {
                img.setRecreationalPost(recpost);
            }
        }

        return recreationalPostService.createRecPost(recpost);
    }*/

    @DeleteMapping("/miperfil/recPost/{id}")
    public ResponseEntity<Void> deleteRecPost(@PathVariable long id, @ModelAttribute("currentUser") Usuario currentUser) {
        Optional<RecreationalPost> optional = recreationalPostService.getRecPostById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        recreationalPostService.deleteRecPostById(id);
        return ResponseEntity.ok().build();
    }


    @PutMapping("/miperfil/recPost/{id}")
    public ResponseEntity<RecreationalPost> modificarRecPost(@PathVariable long id, @RequestBody RecreationalPost newrecpost,
                                                             @ModelAttribute("currentUser") Usuario currentUser) {

        Optional<RecreationalPost> post = recreationalPostService.getRecPostById(id);

        if (post.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        RecreationalPost existente = post.get();

        existente.setDescription(newrecpost.getDescription());
        existente.setCalories(newrecpost.getCalories());
        existente.setDistance(newrecpost.getDistance());
        existente.setDuration(newrecpost.getDuration());

        if (existente.getUsuario() == null || existente.getUsuario().getId() != currentUser.getId()) {
            return ResponseEntity.status(403).build(); // 403 Forbidden
        }

        RecreationalPost nuevoRecpost = recreationalPostService.modifyRecPost(existente);

        return ResponseEntity.ok(nuevoRecpost);
    }
    @GetMapping("/{id}/with-interactions")
    public ResponseEntity<RecPostWithInteractionsDto> getPostWithInteractions(
            @PathVariable Long id,
            @ModelAttribute("currentUser") Usuario currentUser) {

        RecPostWithInteractionsDto dto = recreationalPostService
                .getPostByIdWithInteractions(id, currentUser);
        return ResponseEntity.ok(dto);
    }
    @GetMapping("/hashtag/{hashtag}")
    public List<RecreationalPost> getPublicacionesPorHashtag(@PathVariable String hashtag) {
        return recreationalPostService.buscarPorHashtag(hashtag);
    }



}