package com.dataPresenter.dataPresenter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.dataPresenter.dataPresenter.services.DataAnalyticsService;

import java.util.Map;

@RestController
@RequestMapping("/data_analysis")
@CrossOrigin(origins = "http://localhost:3000")
public class DataAnalyticsController{

    private final DataAnalyticsService dataAnalyticsService;

    @Autowired
    public DataAnalyticsController(DataAnalyticsService dataAnalyticsService) {
        this.dataAnalyticsService = dataAnalyticsService;
    }

    @PostMapping("/upload")
    public Map<String, Object> uploadCSV(@RequestParam("file") MultipartFile file) {
        return dataAnalyticsService.uploadAndProcessCSV(file);
    }
}
