package com.Momentum.Momentum.email;

import com.Momentum.Momentum.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
@CrossOrigin("http://localhost:3000")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @ModelAttribute("currentUser")
    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();
    }


    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequestDto request,
                                            @ModelAttribute("currentUser") Usuario currentUser) {
        try {
            emailService.sendSimpleEmail(request.getTo(), request.getSubject(), request.getText());
            return ResponseEntity.ok("Email enviado exitosamente por " + currentUser.getEmail());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error enviando email: " + e.getMessage());
        }
    }


    @PostMapping("/send-html")
    public ResponseEntity<String> sendHtmlEmail(@RequestBody EmailRequestDto request,
                                                @ModelAttribute("currentUser") Usuario currentUser) {
        try {
            emailService.sendHtmlEmail(request.getTo(), request.getSubject(), request.getHtmlContent());
            return ResponseEntity.ok("Email HTML enviado exitosamente por " + currentUser.getEmail());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error enviando email HTML: " + e.getMessage());
        }
    }

    // Enviar a múltiples destinatarios
    @PostMapping("/send-multiple")
    public ResponseEntity<String> sendMultipleEmail(@RequestBody EmailRequestDto request,
                                                    @ModelAttribute("currentUser") Usuario currentUser) {
        try {
            emailService.sendEmailToMultiple(request.getRecipients(), request.getSubject(), request.getText());
            return ResponseEntity.ok("Email enviado a múltiples destinatarios por " + currentUser.getEmail());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error enviando email múltiple: " + e.getMessage());
        }
    }

    // Test con autenticación
    @GetMapping("/test")
    public ResponseEntity<String> testEmail(@ModelAttribute("currentUser") Usuario currentUser) {
        try {
            emailService.sendSimpleEmail(currentUser.getEmail(), "Test Email", "Este es un email de prueba para " + currentUser.getUsername());
            return ResponseEntity.ok("Email de prueba enviado a " + currentUser.getEmail());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error en email de prueba: " + e.getMessage());
        }
    }
}
