package com.example.studentservice.Controller;

import com.example.studentservice.Model.Student;
import com.example.studentservice.Service.StudentProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/studentProject")
public class StudentProjectController {

    @Autowired
    private StudentProjectService studentProjectService;
    @GetMapping("{projectId}")
    public ResponseEntity<List<Student>> getStudents(@PathVariable int projectId){
        return studentProjectService.getStudentIds(projectId);

    }
    @GetMapping("/projects/{projectId}/student-count")
    public ResponseEntity<Integer> getStudentCountByProject(@PathVariable int projectId) {
        return studentProjectService.getStudentCountByProjectId(projectId);

    }

}
