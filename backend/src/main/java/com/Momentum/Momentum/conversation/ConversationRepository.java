package com.Momentum.Momentum.conversation;


import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    @Query("SELECT c FROM Conversation c JOIN c.participantes p1 JOIN c.participantes p2 " +
           "WHERE p1.id = :userId1 AND p2.id = :userId2")
    List<Conversation> findByParticipants(Long userId1, Long userId2);

    @Query("SELECT c FROM Conversation c JOIN c.participantes p WHERE p.id = :userId")
    List<Conversation> findByUsuarioId(Long userId);
}

