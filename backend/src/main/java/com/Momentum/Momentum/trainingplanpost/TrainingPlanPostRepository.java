    package com.Momentum.Momentum.trainingplanpost;


    import java.util.List;

    import org.springframework.data.jpa.repository.JpaRepository;
   

    public interface TrainingPlanPostRepository extends JpaRepository<TrainingPlanPost, Long> {
        //JPA maneja las consultas SQL, no es necesario escribirlas aca
        List<TrainingPlanPost> findByUsuarioId(Long userId);
    }