package com.Momentum.Momentum.message;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
    public class MessageDTO {
        private String content;
        private Instant timestamp;
        private Long senderId;
        private Long receiverId;

        public MessageDTO(String content, Instant timestamp, Long senderId, Long receiverId) {
            this.content = content;
            this.timestamp = timestamp;
            this.senderId = senderId;
            this.receiverId = receiverId;
        }
}


