package com.example.facultyservice.Dto;

import com.example.facultyservice.Model.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationRequest {
    private Project project;
    private List<StudentRequest> students;

    // getters and setters
}
