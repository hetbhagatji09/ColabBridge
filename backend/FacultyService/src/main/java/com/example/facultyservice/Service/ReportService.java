package com.example.facultyservice.Service;

import com.example.facultyservice.Dao.ProjectDao;
import com.example.facultyservice.Model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import com.example.facultyservice.Model.Report;

import java.io.IOException;
import java.time.LocalDateTime;

public class ReportService {
    @Autowired
    private ProjectDao projectDao;
    public ResponseEntity<String> submitReport(int studentId, int projectId, MultipartFile file) {
        try{
            Project project = projectDao.findById(projectId)
                    .orElseThrow(() -> new Exception("Project not found"));

            Report report = new Report();
            report.setFileName(file.getOriginalFilename());
            report.setFileData(file.getBytes());
            report.setContentType(file.getContentType());
            report.setSubmissionDate(LocalDateTime.now());
            report.setProject(project);

            reportRepository.save(report);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
