package com.Momentum.Momentum.event;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EventDto {
    String title;
    String date;
    Long idEvent;

    public EventDto(String title, String date, Long idEvent) {
        this.title = title;
        this.date = date;
        this.idEvent = idEvent;
    }

}
