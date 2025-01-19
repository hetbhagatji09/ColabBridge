package com.example.studentservice.Service;

import com.example.studentservice.Dao.StudentDao;
import com.example.studentservice.Dao.StudentProjectDao;
import com.example.studentservice.Model.Student;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentProjectService {

    @Autowired
    private StudentProjectDao studentProjectDao;
    @Autowired
    private StudentDao studentDao;

    public ResponseEntity<List<Student>> getStudentIds(int projectId) {
        try{
            List<Student> students=new ArrayList<>();
            List<Integer> studentIds=studentProjectDao.findStudent_StudentIdByProjectId(projectId);
            for(Integer  studentId:studentIds){
                Student s=studentDao.findStudentByStudentId(studentId);
                students.add(s);
            }
            return new ResponseEntity<>(students,HttpStatus.OK);

        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
}
