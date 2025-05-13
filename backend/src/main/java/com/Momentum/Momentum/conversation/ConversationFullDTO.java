package com.Momentum.Momentum.conversation;

import com.Momentum.Momentum.message.MessageDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsContructor
public class ConversationFullDTO {
    private Long id;
    private Long otherUserId;
    private String otherUsername;
    private String otherAvatarUrl;
    private List<MessageDTO> messages;
    private LocalDateTime lastUpdated;
}
