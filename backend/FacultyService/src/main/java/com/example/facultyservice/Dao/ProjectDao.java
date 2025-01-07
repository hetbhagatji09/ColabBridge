package com.example.facultyservice.Dao;

import com.example.facultyservice.Model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectDao extends JpaRepository<Project,Integer> {
}
