package com.Momentum.Momentum.recreationalpost;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecreationalPostRequestDto {

        private Double distance;
        private String description;
        private String duration;
        private String calories;

        public RecreationalPostRequestDto(){}

    }

