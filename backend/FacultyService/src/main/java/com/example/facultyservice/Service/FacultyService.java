package com.example.facultyservice.Service;

import com.example.facultyservice.Dao.FacultyDao;
import com.example.facultyservice.Dao.ProjectDao;
import com.example.facultyservice.Model.Faculty;
import com.example.facultyservice.Model.Project;
import com.example.facultyservice.Model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

@Service
public class FacultyService {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private FacultyDao facultyDao;
    @Autowired
    private ProjectDao projectDao;
    @Autowired
    private ProjectService projectService;

    private final String STUDENT_SERVICE="http://localhost:8765/STUDENT-SERVICE/api/studentProject/";


    public ResponseEntity<Faculty> registerFaculty(Faculty faculty) {
        try{
            return new ResponseEntity<>(facultyDao.save(faculty), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<List<Project>> getProjectsById(int facultyId) {
        try{
            Faculty faculty=facultyDao.findById(facultyId).get();
            List<Project>projects=projectDao.findByFacultyId(faculty.getF_id());
            return new ResponseEntity<>(projects,HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<List<String>> getProjectsByName(int fId) {
        try {
            Faculty faculty = facultyDao.findById(fId).get();
            List<Project> projects = projectDao.findByFacultyId(faculty.getF_id());
            List<String> projectNames = new ArrayList<>();
            for (Project project : projects) {
                projectNames.add(project.getTitle());
            }
            return new ResponseEntity<>(projectNames, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> deleteProject(int p_id) {
        try {
            projectDao.deleteById(p_id);
            return new ResponseEntity<>("Project deleted successfully", HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<Student>> getStudentsByProject(int projectId) {
        try{
            ResponseEntity<List<Student>> responseEntity = restTemplate.exchange(
                    STUDENT_SERVICE + "/" + projectId,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<Student>>() {}
            );
            List<Student> students=responseEntity.getBody();
            return  new ResponseEntity<>(students,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }




    }


//    public ResponseEntity<Project> createProject(Project project,int f_id) {
//        try {
//            return projectService.createProject(project, f_id);
//        } catch (Exception e) {
//            System.err.println("Error in FacultyService: " + e.getMessage());
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}
