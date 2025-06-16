package com.Momentum.Momentum.email;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class DotenvInitializer {

    @PostConstruct
    public void init() {
        Dotenv dotenv = Dotenv.load();

        String username = dotenv.get("MAIL_USERNAME");
        String password = dotenv.get("MAIL_PASSWORD");

        System.setProperty("MAIL_USERNAME", username);
        System.setProperty("MAIL_PASSWORD", password);
        System.out.println("MAIL_USERNAME: " + System.getProperty("MAIL_USERNAME"));
        System.out.println("MAIL_PASSWORD: " + System.getProperty("MAIL_PASSWORD"));

        System.out.println("✅ Variables cargadas: " + username + " / " + (password != null ? "*****" : "null"));
    }

}

