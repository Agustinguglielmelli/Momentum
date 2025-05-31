
package com.Momentum.Momentum.comment;

import com.Momentum.Momentum.recreationalpost.RecreationalPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostIdOrderByCreatedAtAsc(Long postId);
    Long countByPostId(Long postId);
}
