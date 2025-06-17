/*
package com.Momentum.Momentum.email;

import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Bean
public org.springframework.mail.javamail.JavaMailSender getJavaMailSender() {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    mailSender.setHost("smtp.gmail.com");
    mailSender.setPort(587);

    mailSender.setUsername("my.gmail@gmail.com");
    mailSender.setPassword("password");

    Properties props = mailSender.getJavaMailProperties();
    props.put("email.transport.protocol", "smtp");
    props.put("email.smtp.auth", "true");
    props.put("email.smtp.starttls.enable", "true");
    props.put("email.debug", "true");

    return mailSender;
}
*/
