package com.example.projectservice.Service;

import com.example.projectservice.Dao.ProjectDao;
import com.example.projectservice.Model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectDao projectDao;
    public ResponseEntity<Project> addProject(Project project) {
        try {
            return new ResponseEntity<>(projectDao.save(project), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
