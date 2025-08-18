package com.example.studentservice.Dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentVectorRequest {
    private int studentId;
    private String skills;
}
