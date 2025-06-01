package com.Momentum.Momentum.like;

import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    boolean existsByUsuarioAndPost(Usuario usuario, RecreationalPost post);
    Long countByPost(RecreationalPost post);
    void deleteByUsuarioAndPost(Usuario usuario, RecreationalPost post);
}
