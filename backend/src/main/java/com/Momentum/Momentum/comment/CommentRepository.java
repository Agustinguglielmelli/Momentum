
package com.Momentum.Momentum.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostIdRecPostOrderByCreatedAtAsc(Long postId);
    Long countByPostIdRecPost(Long postId);
    int countByPost_IdRecPost(long idRecPost);
    List<Comment> findByEvent_IdEventOrderByCreatedAtAsc(Long eventId);
    Long countByEvent_IdEvent(Long eventId);
}
