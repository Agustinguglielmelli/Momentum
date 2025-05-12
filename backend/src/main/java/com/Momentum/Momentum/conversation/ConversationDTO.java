package com.Momentum.Momentum.conversation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
public class ConversationDTO {
    private Long id;
    private Long user1Id;
    private Long user2Id;
    private Instant lastUpdated;
}
