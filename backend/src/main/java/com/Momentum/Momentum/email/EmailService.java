/*
package com.Momentum.Momentum.email;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    // Método para enviar email simple
    @Async
    public void sendSimpleEmail(String to, String subject, String text) {
        try {
            System.out.println("Usando cuenta de envío: " + fromEmail);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            System.out.println("Antes de enviar el mail...");
            mailSender.send(message);
            System.out.println("Email enviado exitosamente a: " + to);
        } catch (Exception e) {
            System.err.println("Error enviando email: " + e.getMessage());
            throw new RuntimeException("Error enviando email", e);
        }
    }

    // Método para enviar email con HTML
    public void sendHtmlEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true indica que es HTML

            mailSender.send(message);
            System.out.println("Email HTML enviado exitosamente a: " + to);
        } catch (Exception e) {
            System.err.println("Error enviando email HTML: " + e.getMessage());
            throw new RuntimeException("Error enviando email HTML", e);
        }
    }

    // Método para enviar email con archivos adjuntos
    public void sendEmailWithAttachment(String to, String subject, String text,
                                        String attachmentPath) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);

            // Adjuntar archivo
            File file = new File(attachmentPath);
            helper.addAttachment(file.getName(), file);

            mailSender.send(message);
            System.out.println("Email con adjunto enviado exitosamente a: " + to);
        } catch (Exception e) {
            System.err.println("Error enviando email con adjunto: " + e.getMessage());
            throw new RuntimeException("Error enviando email con adjunto", e);
        }
    }

    // Método para enviar a múltiples destinatarios
    public void sendEmailToMultiple(String[] to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

            mailSender.send(message);
            System.out.println("Email enviado exitosamente a múltiples destinatarios");
        } catch (Exception e) {
            System.err.println("Error enviando email múltiple: " + e.getMessage());
            throw new RuntimeException("Error enviando email múltiple", e);
        }
    }
}


*/
