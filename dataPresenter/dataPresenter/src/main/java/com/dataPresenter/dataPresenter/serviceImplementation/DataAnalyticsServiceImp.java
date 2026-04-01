package com.dataPresenter.dataPresenter.serviceImplementation;

import com.dataPresenter.dataPresenter.services.DataAnalyticsService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;

@Service
public class DataAnalyticsServiceImp implements DataAnalyticsService {

    @Override
    public Map<String, Object> uploadAndProcessCSV(MultipartFile file) {
        List<String> labels = new ArrayList<>();
        List<Double> values = new ArrayList<>();
        String labelColumn = "";
        String valueColumn = "";

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean isHeader = true;
            String[] headers = null;

            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");

                if (isHeader) {
                    headers = parts;
                    labelColumn = headers[0];  // first column is label
                    valueColumn = headers[1];  // second column is value
                    isHeader = false;
                    continue;
                }

                labels.add(parts[0]);
                values.add(Double.parseDouble(parts[1]));
            }

            Map<String, Object> result = new HashMap<>();
            result.put("labels", labels);
            result.put("values", values);
            result.put("labelName", labelColumn);   // pass column name
            result.put("valueName", valueColumn);   // pass column name

            return result;

        } catch (Exception e) {
            throw new RuntimeException("Error processing CSV", e);
        }
    }
}