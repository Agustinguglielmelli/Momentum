
package com.Momentum.Momentum.like;

import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
public class LikeController {
    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping("/has-liked/{postId}")
    public ResponseEntity<Boolean> hasUserLikedPost(
            @PathVariable Long postId,
            @ModelAttribute("currentUser") Usuario currentUser) {

        RecreationalPost post = new RecreationalPost();
        post.setIdRecPost(postId);

        boolean hasLiked = likeService.hasUserLiked(currentUser, post);
        return ResponseEntity.ok(hasLiked);
    }

    @PostMapping("/toggle/{postId}")
    public ResponseEntity<Void> toggleLike(
            @PathVariable Long postId,
            @ModelAttribute("currentUser") Usuario currentUser,
            @RequestBody RecreationalPost post) {
        likeService.toggleLike(currentUser, post);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/count/{postId}")
    public ResponseEntity<Long> getLikeCount(@PathVariable Long postId) {
        Long count = likeService.getLikeCount(postId);
        return ResponseEntity.ok(count);
    }
}
