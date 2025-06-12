package com.Momentum.Momentum.like;

import com.Momentum.Momentum.event.Event;
import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import com.Momentum.Momentum.usuario.Usuario;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeService {
    private final LikeRepository likeRepository;

    @Autowired
    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    @Transactional
    public void toggleLike(Usuario usuario, RecreationalPost post) {
        if (likeRepository.existsByUsuarioAndPost(usuario, post)) {
            likeRepository.deleteByUsuarioAndPost(usuario, post);
        } else {
            Like like = new Like();
            like.setUsuario(usuario);
            like.setPost(post);
            likeRepository.save(like);
        }
    }

    public Long getLikeCount(RecreationalPost post) {
        return likeRepository.countByPost(post);
    }

    public boolean hasUserLiked(Usuario usuario, RecreationalPost post) {
        return likeRepository.existsByUsuarioAndPost(usuario, post);
    }

    // ----------------------- Eventos -----------------------
    public boolean hasUserLikedEvent(Usuario usuario, Event event) {
        return likeRepository.findByUsuarioAndEvent(usuario, event).isPresent();
    }

    public void toggleEventLike(Usuario usuario, Event event) {
        Optional<Like> existingLike = likeRepository.findByUsuarioAndEvent(usuario, event);

        if (existingLike.isPresent()) {
            // Si ya existe el like, lo eliminamos
            likeRepository.delete(existingLike.get());
        } else {
            // Si no existe, lo creamos
            Like newLike = new Like();
            newLike.setUsuario(usuario);
            newLike.setEvent(event);
              likeRepository.save(newLike);
        }
    }
    public Long getEventLikeCount(Event event) {
        return likeRepository.countByEvent(event);
    }
}
