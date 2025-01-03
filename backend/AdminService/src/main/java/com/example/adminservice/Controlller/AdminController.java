package com.example.adminservice.Controlller;

import com.example.adminservice.Model.Faculty;
import com.example.adminservice.Feign.FacultyClient;
import com.example.adminservice.Model.Student;
import com.example.adminservice.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @GetMapping("hello")
    public String hello() {
        return "hello";
    }
    @PostMapping("faculty/register")
    public ResponseEntity<Faculty> registerFaculty(@RequestBody Faculty faculty) {
        return adminService.registerFaculty(faculty);
    }
    @PostMapping("student/register")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
        return adminService.registerStudent(student);
    }

}
