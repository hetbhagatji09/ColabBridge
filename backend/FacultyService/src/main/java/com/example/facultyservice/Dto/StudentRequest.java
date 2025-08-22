package com.example.facultyservice.Dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentRequest {
    private int studentId;
    private List<String> skills=new ArrayList<>();
    private float ratings=0;
    private String resumeUrl;

    public StudentRequest(int studentId, List<String> skills, float ratings) {
        this.studentId = studentId;
        this.skills = skills;
        this.ratings = ratings;
        this.resumeUrl=null;
    }
}
