package com.example.studentservice.Service;

import com.example.studentservice.Dao.StudentDao;
import com.example.studentservice.Dao.StudentProjectDao;
import com.example.studentservice.Feign.AuthInterface;
import com.example.studentservice.Model.PersonalProject;
import com.example.studentservice.Model.StudentAvaibility;
import com.example.studentservice.Model.StudentProject;
import com.example.studentservice.Vo.Project;
import com.example.studentservice.Model.Student;
import com.example.studentservice.Vo.Status;
import com.example.studentservice.Vo.UserCredential;
import com.example.studentservice.Dto.NotificationRequest;
import com.example.studentservice.Vo.UserRole;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.PropertiesLoaderSupport;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private AuthInterface authInterface;
    private static final String FACULTY_SERVICE_URL = "http://localhost:8765/FACULTY-SERVICE/api/project";
    @Autowired
    private StudentDao studentDao;
    @Autowired
    private StudentProjectDao studentProjectDao;



    public ResponseEntity<Student> registerStudent(Student student) {
        try{
                return new ResponseEntity<>(studentDao.save(student), HttpStatus.OK);
            }
            catch(Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

//    @RabbitListener(queues = "${rabbitmq.queue}")
//    public void receiveProject(Project project) {
//        System.out.println("Received project from" + project + "by " +project.getFaculty());
//        // Save the project to the database or update the student UI
//    }


    @Transactional
    public ResponseEntity<String> registerFile(@RequestPart("file") MultipartFile file) {
        try (InputStream inputStream = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(inputStream)) {

            Sheet sheet = workbook.getSheetAt(0);
            List<Student> students = new ArrayList<>();
            List<UserCredential> users = new ArrayList<>();

            for (int i = 1; i <= sheet.getLastRowNum(); i++) { // Start from row 1 to skip header
                Row row = sheet.getRow(i);

                if (row != null) {
                    Student student = new Student();
                    UserCredential user = new UserCredential();

                    // Roll Number
                    Cell rollCell = row.getCell(0);
                    if (rollCell != null && rollCell.getCellType() == CellType.NUMERIC) {
                        student.setRoll_no((int) Math.round(rollCell.getNumericCellValue()));
                    }

                    // Student Name
                    Cell nameCell = row.getCell(1);
                    if (nameCell != null && nameCell.getCellType() == CellType.STRING) {
                        student.setName(nameCell.getStringCellValue());
                    }

                    // Email
                    Cell emailCell = row.getCell(2);
                    if (emailCell != null && emailCell.getCellType() == CellType.STRING) {
                        String email = emailCell.getStringCellValue();
                        System.out.println(email);
                        if (studentDao.existsByEmail(email)) {
                            return new ResponseEntity<>("Email " + email + " is already registered", HttpStatus.CONFLICT);
                        }
                        student.setEmail(email);
                        user.setUsername(email);
                    }

                    // Password
                    Cell passwordCell = row.getCell(3);
                    if (passwordCell != null) {
                        if (passwordCell.getCellType() == CellType.STRING) {
                            user.setPassword(passwordCell.getStringCellValue());
                        } else if (passwordCell.getCellType() == CellType.NUMERIC) {
                            user.setPassword(String.valueOf((int) passwordCell.getNumericCellValue()));
                        }
                    }

                    // Assign User Role
                    user.setUserRole(UserRole.STUDENT);

                    // Add to lists
                    students.add(student);
                    users.add(user);
                }
            }

            // Save all students and users in batch
            studentDao.saveAll(students);
            authInterface.addNewUser(users);

            return new ResponseEntity<>("File uploaded successfully: " + students.size() + " records added.", HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("File processing failed due to IO error", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("File upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





    public ResponseEntity<List<Project>> getAllProjets() {
        try{
            ResponseEntity<Project[]> response = restTemplate.getForEntity(FACULTY_SERVICE_URL+"/projects", Project[].class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                List<Project> projects = Arrays.asList(response.getBody());
                return new ResponseEntity<>(projects, HttpStatus.OK);
            } else {
                // Handle empty or unexpected response
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    public ResponseEntity<String> applyProject(int studentId,int projectId) {
        try {
            Student student=studentDao.findStudentByStudentId(studentId);
            if(student==null){
                return new ResponseEntity<>("Student is not found",HttpStatus.NOT_FOUND);
            }
            if(student.getStudentAvaibility()==StudentAvaibility.NOT_AVAILABLE){
                return new ResponseEntity<>("You cant Apply Because You are working on project",HttpStatus.CONFLICT);
            }

            if(studentProjectDao.existsByStudent_StudentIdAndProjectId(studentId,projectId)){
                return new ResponseEntity<>("Student has already applied for this project",HttpStatus.CONFLICT);
            }
            // Step 1: Fetch the project using RestTemplate from the Faculty microservice
            String project_url = FACULTY_SERVICE_URL + "/" + projectId;
            ResponseEntity<Project> response = restTemplate.getForEntity(project_url, Project.class);
            Project project = response.getBody();

            // Step 2: Handle case where the project was not found
            if (project == null) {
                System.out.println("Project not found for ID: " + projectId);
                return new ResponseEntity<>("Project not found", HttpStatus.NOT_FOUND);
            }
            if(project.getStatus()==Status.APPROVED){
                new ResponseEntity<>("Student is aleready registered",HttpStatus.CONFLICT);
            }
            StudentProject studentProject=new StudentProject();
            studentProject.setStudent(student);
            studentProject.setStatus(Status.PENDING);
            studentProject.setProjectId(projectId);
            studentProject.setApplicationDate(LocalDate.now());
            studentProjectDao.save(studentProject);

            System.out.println("Fetched Project: " + project);




            String url = FACULTY_SERVICE_URL + "/notify";
            NotificationRequest notificationRequest = new NotificationRequest(projectId, student);
            restTemplate.postForEntity(url, notificationRequest, String.class);


            return new ResponseEntity<>("Project applied successfully", HttpStatus.OK);
        } catch (RestClientException e) {
            // Handle RestTemplate communication errors
            System.err.println("Error with RestTemplate: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>("Failed to communicate with external service", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            // Handle any unexpected errors
            System.err.println("An unexpected error occurred: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public ResponseEntity<Student> getStudentById(int studentId) {
        try{
            return new ResponseEntity<>(studentDao.findStudentByStudentId(studentId),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<String> makeUnavailibity(Student student) {
        try{
            student.setStudentAvaibility(StudentAvaibility.NOT_AVAILABLE);
            studentDao.save(student);
            return new ResponseEntity<>("Student is Unavailable Now",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<Student> updateGithubLink(int studentId, String githubLink) {
        try{
            Optional<Student> studentOptional = studentDao.findById(studentId);
            if (studentOptional.isPresent()) {
                Student student = studentOptional.get();
                student.setGithubProfileLink(githubLink);
                studentDao.save(student);
                return new ResponseEntity<>(student,HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


        return null;
    }

    public ResponseEntity<PersonalProject> addProject(int studentId, PersonalProject personalProject) {
        try{
            Student student=studentDao.findStudentByStudentId(studentId);
            student.getProjects().add(personalProject);
            studentDao.save(student);
            return new ResponseEntity<>(personalProject,HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Student> deleteProject(int studentId, int personalProjectId) {
        try{
            Optional<Student> studentOptional = studentDao.findById(studentId);
            Student s=null;
            if(studentOptional.isPresent()){
                s=studentOptional.get();
                s.getProjects().removeIf(p->p.getPersonalProjectId()==personalProjectId);
                studentDao.save(s);
                return new ResponseEntity<>(s,HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }

    public ResponseEntity<Student> findStudentById(int studentId) {
        try{
            Optional<Student> optionalStudent=studentDao.findById(studentId);
            if(optionalStudent.isPresent()){
                return new ResponseEntity<>(optionalStudent.get(),HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }

    public ResponseEntity<List<Student>> getAllStudentsById(List<Integer> ids) {
        try{
            List<Student> students=studentDao.findAllByStudentId(ids);
            return new ResponseEntity<>(students,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<String> updateStudentsAvailable(int projectId) {
        try {
            System.out.println(projectId + " in student service");

            List<Integer> studentIds = studentProjectDao.findStudent_StudentIdByProjectId(projectId);
            System.out.println("Student IDs: " + studentIds);

            List<Student> students = new ArrayList<>(); // Mutable list
            for (int studentId : studentIds) {
                Optional<Student> optionalStudent = studentDao.findById(studentId);
                if (optionalStudent.isPresent()) {
                    Student s = optionalStudent.get();
                    System.out.println("Fetched Student: " + s.getName() + " (ID: " + s.getStudentId() + ")");
                    students.add(s);
                } else {
                    System.out.println("Student with ID " + studentId + " not found.");
                    return new ResponseEntity<>("Student with ID " + studentId + " not found.", HttpStatus.NOT_FOUND);
                }
            }

            // Update availability
            for (Student s : students) {
                if (s.getStudentAvaibility() == StudentAvaibility.NOT_AVAILABLE) {
                    s.setStudentAvaibility(StudentAvaibility.AVAILABLE);
                }
            }
            List<StudentProject> studentProjects=studentProjectDao.findByProjectId(projectId);
            for (StudentProject s:studentProjects){
                if(s.getStatus()==Status.APPROVED){
                    s.setStatus(Status.COMPLETED);
                }
            }
            studentProjectDao.saveAll(studentProjects);


            studentDao.saveAll(students);
            System.out.println("Students updated successfully.");
            return new ResponseEntity<>("Project is completed", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace(); // Log the exception stack trace
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<Integer> getCount() {
        try{
            Integer count=studentDao.findTotalUsers();
            return new ResponseEntity<>(count,HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Student> findByEmail(String email) {
        try{
            System.out.println(email);
           Student s=studentDao.findByEmail(email);
           if(s==null){
               return new ResponseEntity<>(HttpStatus.NOT_FOUND);
           }
           return new ResponseEntity<>(s,HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
