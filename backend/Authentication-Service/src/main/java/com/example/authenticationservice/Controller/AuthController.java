package com.example.authenticationservice.Controller;

import com.example.authenticationservice.Dto.AuthRequest;
import com.example.authenticationservice.Model.UserCredential;
import com.example.authenticationservice.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    //for authentication
    private AuthenticationManager authenticationManager;

    @PostMapping("register")
    public String addNewUser(@RequestBody List<UserCredential> users){
        return authService.saveUser(users);
    }
    @PostMapping("updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody UserCredential user){
        return authService.updatePassword(user);

    }
    @PostMapping("token")
    public ResponseEntity<Map<String, String>> getToken(@RequestBody AuthRequest authRequest) {
        System.out.println("hello");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        if (authentication.isAuthenticated()) {
            String token = authService.generateToken(authRequest.getUsername(), authRequest.getUserRole());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response); // Return token in a JSON response
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Invalid credentials"));
        }
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam String token, @RequestParam String userRole) {
        if (authService.validateToken(token, userRole)) {
            return "Token is valid";
        } else {
            throw new RuntimeException("Invalid or expired token");
        }
    }

}