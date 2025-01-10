package com.example.authenticationservice.Controller;

import com.example.authenticationservice.Dto.AuthRequest;
import com.example.authenticationservice.Model.UserCredential;
import com.example.authenticationservice.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    //for authentication
    private AuthenticationManager authenticationManager;

    @PostMapping("register")
    public String addNewUser(@RequestBody  UserCredential user){
        return authService.saveUser(user);
    }
    @PostMapping("token")
    public String getToken(@RequestBody AuthRequest authRequest){
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(),authRequest.getPassword()));
        if(authentication.isAuthenticated()){
            return authService.generateToken(authRequest.getUsername());
        }
        else{
            return "Invalid credentials";
        }

    }
    @GetMapping("validate")
    public String validateToken(@RequestParam String token){
        authService.validateToken(token);
        return "Token is validate";

    }

}