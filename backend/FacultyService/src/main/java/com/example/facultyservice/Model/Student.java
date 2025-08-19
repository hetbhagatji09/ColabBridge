package com.example.facultyservice.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private int studentId;
    private String name;
    private List<String> Skills=new ArrayList<>();
    private String bio;
    private String password;
    private String email;
    private int roll_no;
    private String department;
    @Enumerated(EnumType.STRING)
    private StudentAvaibility studentAvaibility=StudentAvaibility.AVAILABLE;
    private float ratings=0;

}
