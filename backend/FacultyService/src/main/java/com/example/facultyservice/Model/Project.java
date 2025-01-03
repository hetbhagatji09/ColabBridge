package com.example.facultyservice.Model;

import java.time.LocalDate;

public class Project {
    private int p_id;
    private String title;
    private String description;
    private String status;
    private LocalDate date;

    public int getP_id() {
        return p_id;
    }

    public void setP_id(int p_id) {
        this.p_id = p_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
    public Project() {
        this.date=LocalDate.now();
    }

    public Project(int p_id, String title, String description, String status, LocalDate date) {
        this.p_id = p_id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.date = date;
    }
}
