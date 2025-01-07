package com.example.facultyservice.Controller;

import com.example.facultyservice.Model.Project;
import com.example.facultyservice.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    @PostMapping("project")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        System.out.println("Hello ProjectController");
        return projectService.createProject(project);
    }
//    @GetMapping("projects/{f_id}")
//    public ResponseEntity<List<Project>> getAllProjectsByFacultyId(@PathVariable int f_id){
//        return projectService.getAllProjectsByFacultyId(f_id);
//    }


}
