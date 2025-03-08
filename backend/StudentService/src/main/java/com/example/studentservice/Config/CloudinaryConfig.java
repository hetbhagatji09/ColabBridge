package com.example.studentservice.Config;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Value("${cloud_name}")
    String cloud_name;
    @Value("${api_key}")
    String api_key;
    @Value("${api_secret}")
    String api_secret;


    @Bean
    public Cloudinary getCloudinary() {
        Cloudinary cloudinary = null;
        Map config = new HashMap();
        config.put("cloud_name", cloud_name);

        config.put("api_key",api_key);
        config.put("api_secret",api_secret);
        config.put("secure",true);
        cloudinary = new Cloudinary(config);
        return cloudinary;
        }
    }

