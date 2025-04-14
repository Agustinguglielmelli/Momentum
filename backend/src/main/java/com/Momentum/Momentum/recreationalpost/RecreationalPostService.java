package com.Momentum.Momentum.recreationalpost;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class RecreationalPostService {

    RecreationalPostRepository recreationalPostRepository;

    public List<RecreationalPost> listAllPosts(){
        return recreationalPostRepository.findAll();
    }

    public Optional<RecreationalPost> getPostById(Long id){
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
}