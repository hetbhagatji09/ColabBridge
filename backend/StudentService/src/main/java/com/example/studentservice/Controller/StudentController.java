package com.example.studentservice.Controller;

import com.example.studentservice.Model.Student;
import com.example.studentservice.Service.StudentService;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("register")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
        return studentService.registerStudent(student);
    }
    @PostMapping("registerFile")
    public ResponseEntity<String> registerFile(@RequestParam("file") MultipartFile file){
        return studentService.registerFile(file);
    }


}
