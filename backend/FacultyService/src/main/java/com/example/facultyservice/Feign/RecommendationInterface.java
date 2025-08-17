package com.example.facultyservice.Feign;

import com.example.facultyservice.Dto.VectorRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "RECOMMENDATION-SERVICE")
public interface RecommendationInterface {
    @GetMapping("/recommend/hellobhai")
    String getHello();
    @PostMapping("/recommend/vector/store")
    void storeVector(@RequestBody VectorRequest request);
}
