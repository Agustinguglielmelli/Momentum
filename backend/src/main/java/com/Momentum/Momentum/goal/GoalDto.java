package com.Momentum.Momentum.goal;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;

@Setter
@Getter
@AllArgsConstructor
public class GoalDto {
    private Long id;
    private String label;
    private String unit;
    private int progress;
    private int target;
    private String color;

    public GoalDto(){}
}
