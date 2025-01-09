package com.example.studentservice.Service;

import com.example.studentservice.Dao.StudentDao;
import com.example.studentservice.Feign.AuthInterface;
import com.example.studentservice.Model.Student;
import com.example.studentservice.Model.UserCredential;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    @Autowired
    private AuthInterface authInterface;
    @Autowired
    private StudentDao studentDao;

    public ResponseEntity<Student> registerStudent(Student student) {
        try{
                return new ResponseEntity<>(studentDao.save(student), HttpStatus.OK);
            }
            catch(Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

    public ResponseEntity<String> registerFile(@RequestPart("file") MultipartFile file) {
        try (InputStream inputStream = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(inputStream)) {

            Sheet sheet = workbook.getSheetAt(0);
            List<Student> students = new ArrayList<>();

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row != null) {
                    Student student = new Student();
                    UserCredential user=new UserCredential();
                    if (row.getCell(1) != null) {
                        student.setRoll_no((int) Math.round(row.getCell(1).getNumericCellValue()));
                    }
                    if (row.getCell(2) != null) {
                        student.setName(row.getCell(2).getStringCellValue());
                    }
                    if (row.getCell(3) != null) {
                        student.setDepartment(row.getCell(3).getStringCellValue());
                    }
                    if (row.getCell(4) != null) {
                        user.setUsername(row.getCell(4).getStringCellValue());
                    }
                    if (row.getCell(5) != null) {

                        user.setPassword(row.getCell(5).getStringCellValue());
                    }
                    user.setUserRole("STUDENT");
                    System.out.println(student);
                    studentDao.save(student);
                    authInterface.addNewUser(user);

                }
            }



            return new ResponseEntity<>("File uploaded successfully: " + sheet.getLastRowNum() + " records added.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("File upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
