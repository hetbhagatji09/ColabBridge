package com.example.serviceregistry;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @Value("${spring.application.api}")
    private String api;
    @GetMapping("/hello")
    public String hello() {
        return "Hello from Service Registry!";
    }
    @GetMapping("/api")
    public String api() {
        return api;
    }
}
