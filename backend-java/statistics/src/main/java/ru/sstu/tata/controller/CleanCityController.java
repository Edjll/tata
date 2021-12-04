package ru.sstu.tata.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.sstu.tata.dto.CleanCity;
import ru.sstu.tata.service.CleanCityService;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CleanCityController {

    private final CleanCityService cleanCityService;

    @GetMapping("/v1/statistics/clean-city")
    public List<CleanCity> getStatistics(@RequestParam Long cameraId) {
        return cleanCityService.getStatistics(cameraId);
    }
}
