package com.Momentum.Momentum.event;

public class EventDto {
    String title;
    String date;
    Long idEvent;

    public EventDto(String title, String date, Long idEvent) {
        this.title = title;
        this.date = date;
        this.idEvent = idEvent;
    }

    public Long getIdEvent() {
        return idEvent;
    }

    public void setIdEvent(Long idEvent) {
        this.idEvent = idEvent;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
