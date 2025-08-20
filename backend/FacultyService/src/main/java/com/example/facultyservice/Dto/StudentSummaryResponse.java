package com.example.facultyservice.Dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StudentSummaryResponse {
    private int studentId;
    private String summary;
}
