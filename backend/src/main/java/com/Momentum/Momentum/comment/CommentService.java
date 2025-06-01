
package com.Momentum.Momentum.comment;

import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.recreationalpost.RecreationalPostRepository;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioDto;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final RecreationalPostRepository recreationalPostRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository,
                          RecreationalPostRepository recreationalPostRepository,
                          UsuarioRepository usuarioRepository) {
        this.commentRepository = commentRepository;
        this.recreationalPostRepository = recreationalPostRepository;
        this.usuarioRepository = usuarioRepository;

    }

    @Transactional
    public CommentDto createComment(CreateCommentDto commentDto, Usuario author) {
        // 1. Verificar que el usuario existe (fresco desde BD)
        Usuario persistentAuthor = usuarioRepository.findById(author.getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Obtener el post
        RecreationalPost post = recreationalPostRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post no encontrado"));

        // 3. Crear y configurar el comentario
        Comment comment = new Comment();
        comment.setText(commentDto.getText());
        comment.setPost(post);

        // 4. Establecer relación bidireccional (usando método helper)
        persistentAuthor.addComment(comment); // ← Esto actualiza ambos lados

        // 5. Guardar (JPA automáticamente persiste las relaciones)
        Comment savedComment = commentRepository.save(comment);

        // 6. Actualizar el usuario (por si hay caché)
        usuarioRepository.save(persistentAuthor);

        return convertToDto(savedComment);
    }

    @Transactional
    public void deleteComment(Long commentId, Usuario currentUser) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comentario no encontrado"));

        // Verificar permisos
        if (!(comment.getAuthor().getId() == (currentUser.getId()))) {
            throw new RuntimeException("No tienes permiso para borrar este comentario");
        }

        // Eliminar usando relación bidireccional
        comment.getAuthor().removeComment(comment); // ← Actualiza ambos lados
        commentRepository.delete(comment);
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
