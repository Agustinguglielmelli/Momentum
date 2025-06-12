package com.Momentum.Momentum.like;

import com.Momentum.Momentum.event.Event;
import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    boolean existsByUsuarioAndPost(Usuario usuario, RecreationalPost post);
    Long countByPost(RecreationalPost post);
    void deleteByUsuarioAndPost(Usuario usuario, RecreationalPost post);
    Optional<Like> findByUsuarioAndEvent(Usuario usuario, Event event);
    Long countByEvent(Event event);
}
