
package com.Momentum.Momentum.comment;

import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.recreationalpost.RecreationalPostRepository;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final RecreationalPostRepository recreationalPostRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository,
                          RecreationalPostRepository recreationalPostRepository) {
        this.commentRepository = commentRepository;
        this.recreationalPostRepository = recreationalPostRepository;
    }

    @Transactional
    public CommentDto createComment(CreateCommentDto commentDto, Usuario author) {
        RecreationalPost post = recreationalPostRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = new Comment();
        comment.setText(commentDto.getText());
        comment.setAuthor(author);
        comment.setPost(post);

        Comment savedComment = commentRepository.save(comment);

        return convertToDto(savedComment);
    }

    public List<CommentDto> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostIdOrderByCreatedAtAsc(postId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Long getCommentCountForPost(Long postId) {
        return commentRepository.countByPostId(postId);
    }

    private CommentDto convertToDto(Comment comment) {
        return new CommentDto(
                comment.getId(),
                comment.getText(),
                new UsuarioDto(
                        comment.getAuthor().getUsername(),
                        comment.getAuthor().getId(),
                        comment.getAuthor().getProfilePicture(),
                        comment.getAuthor().displayUserName()
                ),
                comment.getCreatedAt(),
                comment.getPost().getIdRecPost()
        );
    }
}
