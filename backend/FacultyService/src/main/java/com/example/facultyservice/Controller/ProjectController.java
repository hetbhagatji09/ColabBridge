package com.example.facultyservice.Controller;

import com.example.facultyservice.Model.Project;
import com.example.facultyservice.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("faculty")
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    @PostMapping("{facultyId}")
    public ResponseEntity<Project> createProject(@PathVariable int facultyId, @RequestBody Project project) {
//        System.out.println("value is "+facultyId); // this is just for debugging
        return projectService.createProject(project, facultyId);
    }



}
