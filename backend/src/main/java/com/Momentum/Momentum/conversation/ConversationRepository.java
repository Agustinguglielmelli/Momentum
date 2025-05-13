package com.Momentum.Momentum.conversation;


import com.Momentum.Momentum.usuario.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    Optional<Conversation> findByUser1AndUser2(Usuario user1, Usuario user2);
    Optional<Conversation> findByUser2AndUser1(Usuario user1, Usuario user2); // para cubrir el orden inverso

    default Optional<Conversation> findBetweenUsers(Usuario u1, Usuario u2) {
        return findByUser1AndUser2(u1, u2)
                .or(() -> findByUser2AndUser1(u1, u2));
    }
    List<Conversation> findByUser1OrUser2OrderByLastUpdatedDesc(Usuario user1, Usuario user2);

}

