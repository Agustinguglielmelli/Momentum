package com.Momentum.Momentum.Imagen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Para permitir requests desde React
public class Controller {

    @Autowired
    private Repository imageRepository;

    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadImage(@RequestBody ImageDTO imageDTO) {
        if (imageDTO.getImage() == null || imageDTO.getImage().isEmpty()) {
            return ResponseEntity.badRequest().body("Image data is empty");
        }

        Image image = new Image();
        image.setBase64Data(imageDTO.getImage());

        imageRepository.save(image);

        return ResponseEntity.ok("Image saved successfully");
    }
}