package com.Momentum.Momentum.comment;

import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.recreationalpost.RecreationalPostRepository;
import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    private final CommentService commentService;
    private final RecreationalPostRepository postRepository;

    public CommentController(CommentService commentService, RecreationalPostRepository postRepository) {
        this.commentService = commentService;
        this.postRepository = postRepository;
    }

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();
    }

    // Crear comentario en un post
    @PostMapping("/")
    public ResponseEntity<CommentDto> createComment(
            @RequestBody CreateCommentDto commentDto,
            @ModelAttribute("currentUser") Usuario currentUser) {

        Optional<RecreationalPost> postOpt = postRepository.findById(commentDto.getPostId());
        if (postOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        CommentDto createdComment = commentService.createComment(commentDto, currentUser);
        return ResponseEntity.ok(createdComment);
    }

    // Obtener comentarios de un post
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDto>> getCommentsByPostId(@PathVariable Long postId) {
        Optional<RecreationalPost> postOpt = postRepository.findById(postId);
        if (postOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<CommentDto> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    // Obtener cantidad de comentarios de un post
    @GetMapping("/post/{postId}/count")
    public ResponseEntity<Long> getCommentCountByPostId(@PathVariable Long postId) {
        Optional<RecreationalPost> postOpt = postRepository.findById(postId);
        if (postOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Long count = commentService.getCommentCountForPost(postId);
        return ResponseEntity.ok(count);
    }
}
