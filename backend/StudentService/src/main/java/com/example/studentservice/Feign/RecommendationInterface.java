package com.example.studentservice.Feign;

import com.example.studentservice.Dto.StudentVectorRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "RECOMMENDATION-SERVICE")
public interface RecommendationInterface {

    @PostMapping("/studentvector/store")
    void storeVector(@RequestBody StudentVectorRequest request);
    @GetMapping("/recommend/projects/{studentId}")
    ResponseEntity<List<Integer>> getRecommendationIdsForProject(@PathVariable int studentId);
}
