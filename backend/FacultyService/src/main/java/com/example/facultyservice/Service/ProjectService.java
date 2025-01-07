package com.example.facultyservice.Service;

import com.example.facultyservice.Dao.ProjectDao;
import com.example.facultyservice.Model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private ProjectDao projectDao;
    public ResponseEntity<Project> createProject(Project project) {
        try {
//            return new ResponseEntity<>(projectDao.save(project), HttpStatus.OK);
            ResponseEntity<Project> response = new ResponseEntity<>(projectDao.save(project), HttpStatus.OK);
            if (response.getStatusCode().is2xxSuccessful()) {
                messagingTemplate.convertAndSend("/topic/notify-students",
                        "New project created: " + project.getTitle());
                System.out.println("Project created: " + project.getTitle());
            }
            return response;
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    public ResponseEntity<List<Project>> getAllProjectsByFacultyId(int fId) {
//
//    }
}
