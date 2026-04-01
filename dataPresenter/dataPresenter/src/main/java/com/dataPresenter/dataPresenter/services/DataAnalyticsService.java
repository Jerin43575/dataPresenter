package com.dataPresenter.dataPresenter.services;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface DataAnalyticsService {
    Map<String, Object> uploadAndProcessCSV(MultipartFile file);
}