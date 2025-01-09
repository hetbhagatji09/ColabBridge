package com.example.studentservice.Feign;

import com.example.studentservice.Model.UserCredential;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "AUTHENTICATION-SERVICE")
public interface AuthInterface {
    @PostMapping("auth/register")
    public String addNewUser(@RequestBody UserCredential user);
}
