package com.example.facultyservice.Feign;

import com.example.facultyservice.Dto.*;
import com.example.facultyservice.Model.Project;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "RECOMMENDATION-SERVICE")
public interface RecommendationInterface {
    @GetMapping("/recommend/hellobhai")
    String getHello();
    @PostMapping("/recommend/vector/store")
    void storeVector(@RequestBody VectorRequest request);
    @PostMapping("/recommend/student")
    ResponseEntity<List<Integer>> getRecommendationByProjectAndStudent(@RequestBody RecommendationRequest request);
    @PostMapping("recommend/summerize")
    ResponseEntity<StudentSummaryResponse> summerizeByProjectAndResume(@RequestBody SummerizeDto summerizeDto);
}
