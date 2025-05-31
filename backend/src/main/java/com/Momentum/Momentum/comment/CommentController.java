
package com.Momentum.Momentum.comment;

import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();
    }

    @PostMapping
    public ResponseEntity<CommentDto> createComment(
            @RequestBody CreateCommentDto commentDto,
            @ModelAttribute("currentUser") Usuario currentUser) {

        CommentDto createdComment = commentService.createComment(commentDto, currentUser);
        return ResponseEntity.ok(createdComment);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDto>> getCommentsByPostId(@PathVariable Long postId) {
        List<CommentDto> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/post/{postId}/count")
    public ResponseEntity<Long> getCommentCountByPostId(@PathVariable Long postId) {
        Long count = commentService.getCommentCountForPost(postId);
        return ResponseEntity.ok(count);
    }
}
