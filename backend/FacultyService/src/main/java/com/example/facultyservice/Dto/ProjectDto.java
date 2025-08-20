package com.example.facultyservice.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private int projectId;
    private String title;
    private String description;
    private List<String> skills;
    private Integer maxStudents;
}
