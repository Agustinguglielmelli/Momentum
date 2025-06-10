package com.Momentum.Momentum.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    // Endpoint para enviar email simple
    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequestDto request) {
        try {
            emailService.sendSimpleEmail(request.getTo(), request.getSubject(), request.getText());
            return ResponseEntity.ok("Email enviado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error enviando email: " + e.getMessage());
        }
    }

    // Endpoint para enviar email HTML
    @PostMapping("/send-html")
    public ResponseEntity<String> sendHtmlEmail(@RequestBody EmailRequestDto request) {
        try {
            emailService.sendHtmlEmail(request.getTo(), request.getSubject(), request.getHtmlContent());
            return ResponseEntity.ok("Email HTML enviado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error enviando email HTML: " + e.getMessage());
        }
    }

    // Endpoint para enviar a múltiples destinatarios
    @PostMapping("/send-multiple")
    public ResponseEntity<String> sendMultipleEmail(@RequestBody EmailRequestDto request) {
        try {
            emailService.sendEmailToMultiple(request.getRecipients(), request.getSubject(), request.getText());
            return ResponseEntity.ok("Email enviado a múltiples destinatarios exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error enviando email múltiple: " + e.getMessage());
        }
    }

    // Endpoint simple para testing
    @GetMapping("/test")
    public ResponseEntity<String> testEmail() {
        try {
            emailService.sendSimpleEmail("test@example.com", "Test Email", "Este es un email de prueba desde Spring Boot");
            return ResponseEntity.ok("Email de prueba enviado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error en email de prueba: " + e.getMessage());
        }
    }
}

