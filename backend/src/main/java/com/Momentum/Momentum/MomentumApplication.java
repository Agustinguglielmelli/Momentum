package com.Momentum.Momentum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class MomentumApplication {

	public static void main(String[] args) {
		SpringApplication.run(MomentumApplication.class, args);

	}

}
