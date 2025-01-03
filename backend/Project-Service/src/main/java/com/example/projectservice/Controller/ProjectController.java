package com.example.projectservice.Controller;

import com.example.projectservice.Model.Project;
import com.example.projectservice.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    @PostMapping("/project")
    public ResponseEntity<Project> addProject(@RequestBody Project project) {
        return projectService.addProject(project);
    }
}
