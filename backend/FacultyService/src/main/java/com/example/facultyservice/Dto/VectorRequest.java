package com.example.facultyservice.Dto;

import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VectorRequest {
    private int projectId;
    private String content;

}
