package com.example.facultyservice.Feign;

import com.example.facultyservice.Model.Project;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name ="PROJECT-SERVICE")
public interface ProjectInterface {
    @PostMapping("project/project")
    public ResponseEntity<Project> createProject(@RequestBody Project project);
    
}
