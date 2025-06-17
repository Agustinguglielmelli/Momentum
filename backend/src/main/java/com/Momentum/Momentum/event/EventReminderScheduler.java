package com.Momentum.Momentum.event;

import com.Momentum.Momentum.email.EmailService;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class EventReminderScheduler {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private EmailService emailService;

    //esta anotacion funciona todos los dias a las 8am @Scheduled(cron = "0 0 8 * * *")
    @Scheduled(cron = "*/20 * * * * *") // formato: segundo, minuto, hora, día, mes, díaSemana
    public void sendReminderEmails() {
        System.out.println("Ejecutando envío de recordatorios de eventos...");

        List<Usuario> allUsers = usuarioRepository.findAll();
        System.out.println("Usuarios encontrados: " + allUsers.size());

        for (Usuario user : allUsers) {
            List<Event> joinedEvents = eventService.findJoinedEvents(user.getId());

            // Usar exactamente la misma lógica que funciona en el controller
            List<Event> eventsToNotify = joinedEvents.stream()
                    .filter(event -> {
                        try {
                            LocalDate eventDate = LocalDate.parse(event.getDate());
                            return eventDate.equals(LocalDate.now().plusDays(1));
                        } catch (Exception e) {
                            System.err.println("Error parsing date for event: " + event.getTitle() + ", date: " + event.getDate());
                            return false;
                        }
                    }).toList();

            if (!eventsToNotify.isEmpty()) {
                String subject = "Recordatorio de eventos próximos";
                String text = "Hola " + user.displayUserName() + ",\n\n" +
                        "Recuerda que quedan menos de 24hs para los siguientes eventos:\n\n" +
                        eventsToNotify.stream()
                                .map(e -> "- " + e.getTitle() + " el " + e.getDate())
                                .collect(Collectors.joining("\n"));

                try {
                    emailService.sendSimpleEmail(user.getUsername(), subject, text);
                    System.out.println("Recordatorio enviado a: " + user.getUsername() + " para " + eventsToNotify.size() + " eventos");
                } catch (Exception e) {
                    System.err.println("Error al enviar mail a " + user.getUsername() + ": " + e.getMessage());
                }
            }
        }

        System.out.println("Proceso de recordatorios completado.");
    }
}