package com.Momentum.Momentum.recreationalpost;

//import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.comment.CommentRepository;
import com.Momentum.Momentum.like.LikeRepository;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<RecreationalPost> listAllRecPostsOfUser(Long userId) {
            return recreationalPostRepository.findByUsuarioId(userId);
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

}