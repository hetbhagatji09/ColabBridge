package com.example.adminservice.Service;

import com.example.adminservice.Feign.FacultyClient;
import com.example.adminservice.Feign.StudentClient;
import com.example.adminservice.Model.Faculty;
import com.example.adminservice.Model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private StudentClient studentClient;
    @Autowired
    private FacultyClient facultyClient;

    public ResponseEntity<Faculty> registerFaculty(Faculty faculty) {
        try{
            return new ResponseEntity<>(facultyClient.registerFaculty(faculty), HttpStatus.OK).getBody();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<Student> registerStudent(Student student) {
        try{
            return new ResponseEntity<>(studentClient.registerStudent(student), HttpStatus.OK).getBody();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
