package com.example.projectservice.Dao;

import com.example.projectservice.Model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectDao extends JpaRepository<Project,Integer> {
}
