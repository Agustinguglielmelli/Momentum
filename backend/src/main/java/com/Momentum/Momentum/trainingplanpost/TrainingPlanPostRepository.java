    package com.Momentum.Momentum.trainingplanpost;


    import org.springframework.data.jpa.repository.JpaRepository;

    import java.util.List;
    import java.util.Optional;

    public interface TrainingPlanPostRepository extends JpaRepository<TrainingPlanPost, Long> {
        //JPA maneja las consultas SQL, no es necesario escribirlas aca
        List<TrainingPlanPost> findByUsuarioId(Long userId);
    }