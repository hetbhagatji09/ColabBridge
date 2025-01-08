package com.example.authenticationservice.Dao;

import com.example.authenticationservice.Model.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCredentialDao extends JpaRepository<UserCredential,Integer> {
}
