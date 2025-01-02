package com.example.adminservice.Controlller;

import com.example.adminservice.Model.Faculty;
import com.example.adminservice.Feign.FacultyClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin")
public class AdminController {
    @Autowired
    private FacultyClient facultyClient;
    @GetMapping("hello")
    public String hello() {
        return "hello";
    }
    @PostMapping("faculty/register")
    public ResponseEntity<Faculty> registerFaculty(@RequestBody Faculty faculty) {
        return facultyClient.registerFaculty(faculty);
    }

}
