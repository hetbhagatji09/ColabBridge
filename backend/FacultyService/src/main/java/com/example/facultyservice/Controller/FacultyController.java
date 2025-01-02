package com.example.facultyservice.Controller;

import com.example.facultyservice.Model.Faculty;
import com.example.facultyservice.Service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("faculty")
public class FacultyController {
    @Autowired
    private FacultyService facultyService;


    @PostMapping("register")
    public ResponseEntity<Faculty> register(@RequestBody Faculty faculty) {
        return facultyService.addFaculty(faculty);
    }
}
