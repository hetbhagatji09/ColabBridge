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
    private List<String> Skills=new ArrayList<>();
    private float ratings=0;

}
