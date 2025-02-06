package com.example.authenticationservice.Service;

import com.example.authenticationservice.Dao.UserCredentialDao;
import com.example.authenticationservice.Model.UserCredential;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {
    @Autowired
    private UserCredentialDao userCredentialDao;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    public String saveUser(List<UserCredential> users){
        users.parallelStream().forEach(user -> {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        });

        userCredentialDao.saveAll(users);
        return "Users saved";
    }
    public String generateToken(String username) {
        UserCredential user = userCredentialDao.findByUsername(username).orElseThrow(() ->
                new RuntimeException("User not found"));


        return jwtService.generateToken(username);
    }
    public boolean validateToken(String token) {
        return jwtService.validateToken(token);
    }

    public ResponseEntity<String> updatePassword(UserCredential user) {
        UserCredential existingUser=userCredentialDao.findByUsername(user.getUsername())
                .orElseThrow(()-> new RuntimeException("User not found"));
        existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        userCredentialDao.save(existingUser);
        return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);

    }
}
