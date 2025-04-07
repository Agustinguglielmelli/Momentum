package com.Momentum.Momentum.Imagen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000") // Para permitir requests desde React
public class ImgController {

    @Autowired
    private ImgRepository imageRepository;

    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadImage(@RequestBody Image image) {
        if (image.getBase64Data() == null || image.getBase64Data().isEmpty()) {
            return ResponseEntity.badRequest().body("Image data is empty");
        }
        imageRepository.save(image);

        return ResponseEntity.ok("Image saved successfully");
    }
}