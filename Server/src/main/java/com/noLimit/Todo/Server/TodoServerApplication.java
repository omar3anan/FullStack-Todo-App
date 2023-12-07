package com.noLimit.Todo.Server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class TodoServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoServerApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**") // means that it will allow all the request from all the origins
						.allowedMethods("*") // means that it will allow all the methods like GET, POST, PUT, DELETE
												// etc.
						.allowedOrigins("http://localhost:3000");
			}
			// addMapping("/**") means that it will allow all the request from all the
			// origins
			// .allowedMethods("*") means that it will allow all the methods like GET, POST,
			// PUT, DELETE etc.
			// .allowedOrigins("http://localhost:3000") means that it will allow request
		};
	}

}
