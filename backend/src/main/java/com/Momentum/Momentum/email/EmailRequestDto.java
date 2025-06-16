package com.Momentum.Momentum.email;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailRequestDto {
    private String to;
    private String subject;
    private String text;
    private String htmlContent;
    private String[] recipients;

    public EmailRequestDto() {}

    public EmailRequestDto(String to, String subject, String text) {
        this.to = to;
        this.subject = subject;
        this.text = text;
    }
}
