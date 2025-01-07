package com.example.facultyservice.Service;

import com.example.facultyservice.Dao.FacultyDao;
import com.example.facultyservice.Model.Faculty;
import com.example.facultyservice.Model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class FacultyService {
    @Autowired
    private FacultyDao facultyDao;
    @Autowired
    private ProjectService projectService;

    public ResponseEntity<Faculty> registerFaculty(Faculty faculty) {
        try{
            return new ResponseEntity<>(facultyDao.save(faculty), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    public ResponseEntity<Project> createProject(Project project) {
        try {
            return projectService.createProject(project);
        } catch (Exception e) {
            System.err.println("Error in FacultyService: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
