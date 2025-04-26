package com.Momentum.Momentum.recreationalpost;

//import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecreationalPostService {

    RecreationalPostRepository recreationalPostRepository;

    @Autowired
    public RecreationalPostService(RecreationalPostRepository recreationalPostRepository) {
        this.recreationalPostRepository = recreationalPostRepository;
    }

    public List<RecreationalPost> listAllRecPostsOfUser(Long userId) {
            return recreationalPostRepository.findByUsuarioId(userId);
    }

    public Optional<RecreationalPost> getRecPostById(Long id){
        return recreationalPostRepository.findById(id);
    }

    public void deleteRecPostById(Long id){
        recreationalPostRepository.deleteById(id);
    }
    public RecreationalPost createRecPost(RecreationalPost recpost){
        return recreationalPostRepository.save(recpost);
    }
    public RecreationalPost modifyRecPost(RecreationalPost recpost){
        return recreationalPostRepository.save(recpost);
    }

    public List<RecreationalPost> getPostsByUserId(Long userId) {
        return recreationalPostRepository.findByUsuarioId(userId);
    }
}