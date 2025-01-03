package com.example.studentservice.Dao;

import com.example.studentservice.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDao extends JpaRepository<Student,Integer> {
}
