package com.example.authenticationservice.Controller;

import com.example.authenticationservice.Model.UserCredential;
import com.example.authenticationservice.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("register")
    public String addNewUser(UserCredential user){
        return authService.saveUser(user);
    }
    @GetMapping("token")
    public String getToken(UserCredential user){
        return authService.generateToken(user.getUsername());
    }
    @GetMapping("validate")
    public String validateToken(String token){
        authService.validateToken(token);
        return "Token is validate";

    }

}
