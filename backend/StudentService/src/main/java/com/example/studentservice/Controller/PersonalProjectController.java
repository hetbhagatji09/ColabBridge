package com.example.studentservice.Controller;

import com.example.studentservice.Vo.PersonalProjectDTO;
import com.example.studentservice.Service.PersonalProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/personalProject")
public class PersonalProjectController {

    @Autowired
    private PersonalProjectService personalProjectService;

    @PostMapping("/{studentId}")
    public ResponseEntity<?> createPersonalProject(
            @RequestBody PersonalProjectDTO personalProjectDTO, @PathVariable int studentId) {
        try {
            PersonalProjectDTO savedProject = personalProjectService.createPersonalProject(personalProjectDTO, studentId);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    // ✅ Get all personal projects for a student
    @GetMapping("/{studentId}")
    public ResponseEntity<List<PersonalProjectDTO>> getAllPersonalProjects(@PathVariable int studentId) {
        return ResponseEntity.ok(personalProjectService.getAllPersonalProjects(studentId));
    }

    // ✅ Get a specific personal project by ID
    @GetMapping("/project/{projectId}")
    public ResponseEntity<PersonalProjectDTO> getPersonalProjectById(@PathVariable int projectId) {
        return ResponseEntity.ok(personalProjectService.getPersonalProjectById(projectId));
    }

    // ✅ Update a personal project
    @PutMapping("/{projectId}")
    public ResponseEntity<PersonalProjectDTO> updatePersonalProject(
            @PathVariable int projectId, @RequestBody PersonalProjectDTO personalProjectDTO) {
        return ResponseEntity.ok(personalProjectService.updatePersonalProject(projectId, personalProjectDTO));
    }

    // ✅ Delete a personal project
    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deletePersonalProject(@PathVariable int projectId) {
        personalProjectService.deletePersonalProject(projectId);
        return ResponseEntity.ok("Project deleted successfully!");
    }
}
