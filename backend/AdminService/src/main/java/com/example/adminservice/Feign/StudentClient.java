package com.example.adminservice.Feign;

import com.example.adminservice.Model.Faculty;
import com.example.adminservice.Model.Student;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "STUDENTSERVICE")
public interface StudentClient {
    @PostMapping("student/register")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student);
}
