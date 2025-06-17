package com.Momentum.Momentum.recreationalpost;

//import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.comment.CommentRepository;
import com.Momentum.Momentum.image.ImageDto;
import com.Momentum.Momentum.like.LikeRepository;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecreationalPostService {

    RecreationalPostRepository recreationalPostRepository;
    @Autowired
    LikeRepository likeRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    public RecreationalPostService(RecreationalPostRepository recreationalPostRepository) {
        this.recreationalPostRepository = recreationalPostRepository;
    }

    public List<RecPostDto> listAllRecPostsOfUser(Long userId) {
        List<RecreationalPost> RecPosts = recreationalPostRepository.findByUsuarioId(userId);
        List<RecPostDto> dtos = new ArrayList<>();
        for (RecreationalPost post : RecPosts) {
            dtos.add(mapToDto(post));
        }
        return dtos;
    }
    public Optional<RecreationalPost> getRecPostById(Long id){
        return recreationalPostRepository.findById(id);
    }

    public void deleteRecPostById(Long id){
        recreationalPostRepository.deleteById(id);
    }
    public RecreationalPost createRecPost(RecreationalPost recpost){
        return recreationalPostRepository.save(recpost);
    }
    public RecreationalPost modifyRecPost(RecreationalPost recpost){
        return recreationalPostRepository.save(recpost);
    }

    public List<RecreationalPost> getPostsByUserId(Long userId) {
        return recreationalPostRepository.findByUsuarioId(userId);
    }

    public RecPostWithInteractionsDto getPostByIdWithInteractions(Long postId, Usuario currentUser) {
        RecreationalPost post = recreationalPostRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        RecPostWithInteractionsDto dto = new RecPostWithInteractionsDto();

        dto.setIdRecPost(post.getIdRecPost());
        dto.setDistance(post.getDistance());
        dto.setCalories(post.getCalories());
        dto.setDescription(post.getDescription());
        dto.setDuration(post.getDuration());
        dto.setCreationDate(post.getCreationDate());

        UsuarioDto usuarioDto = new UsuarioDto();
        usuarioDto.setId(post.getUsuario().getId());
        usuarioDto.setUsername(post.getUsuario().getUsername());
        usuarioDto.setDisplayUserName(post.getUsuario().displayUserName());
        usuarioDto.setProfilePicture(post.getUsuario().getProfilePicture());

        dto.setUsuario(usuarioDto);

        if (post.getImages() != null) {
            List<String> imagesBase64 = post.getImages().stream()
                    .map(image -> image.getBase64Data())
                    .toList();
            dto.setImages(imagesBase64);
        }

        // Información de interacciones
        dto.setLikeCount(likeRepository.countByPost(post));
        dto.setUserLiked(likeRepository.existsByUsuarioAndPost(currentUser, post));
        dto.setCommentCount(commentRepository.countByPost_IdRecPost(post.getIdRecPost()));

        return dto;
    }
    private RecPostDto mapToDto(RecreationalPost post) {
        RecPostDto dto = new RecPostDto();
        dto.setIdRecPost(post.getIdRecPost());
        dto.setDistance(post.getDistance());
        dto.setDescription(post.getDescription());
        dto.setDuration(post.getDuration());
        dto.setCalories(post.getCalories());
        dto.setFechaPublicacion(post.getCreationDate());
        dto.setImages(post.getImages().stream().map(
                image -> new ImageDto(image.getId(), image.getBase64Data())
        ).toList());

        return dto;
    }

    public List<RecreationalPost> buscarPorHashtag(String hashtag) {
        return recreationalPostRepository.findByHashtagsContaining(hashtag);
    }
    public List<String> getHashtagsPopulares() {
        List<RecreationalPost> todas = recreationalPostRepository.findAll();
        Map<String, Long> conteo = todas.stream()
                .flatMap(p -> p.getHashtags().stream())
                .collect(Collectors.groupingBy(hashtag -> hashtag, Collectors.counting()));

        return conteo.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(10) // Top 10
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }



}