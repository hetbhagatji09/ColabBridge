package com.example.studentservice.Service;

import com.example.studentservice.Dao.StudentProjectDao;
import com.example.studentservice.Model.Student;
import com.example.studentservice.Model.StudentProject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ReportService {
    private final StudentService studentService;
    private final StudentProjectDao studentProjectDao;

    public ReportService(StudentService studentService, StudentProjectDao studentProjectDao) {
        this.studentService = studentService;
        this.studentProjectDao = studentProjectDao;
    }

    public ResponseEntity<String> submitReport(int studentId, int projectId, MultipartFile file) {
        try{
            ResponseEntity<Student> student=studentService.findStudentById(studentId);
//            StudentProject studentProject = studentProjectDao.findByStudentAndProjectId(student, projectId)
//                    .orElseThrow(() -> new Exception("Student not assigned to this project"));

            return new ResponseEntity<>("Project is submited",HttpStatus.OK);


        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
