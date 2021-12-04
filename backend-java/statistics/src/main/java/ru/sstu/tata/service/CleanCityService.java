package ru.sstu.tata.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.sstu.tata.database.repository.CleanCityRepository;
import ru.sstu.tata.dto.CleanCity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CleanCityService {

    private final CleanCityRepository cleanCityRepository;

    public List<CleanCity> getStatistics(Long cameraId) {
        LocalDateTime date = LocalDateTime.now();
        return cleanCityRepository
                .findAllByCameraIdAndDateAfterOrderByDateAsc(cameraId, date.minusDays(7))
                .stream()
                .map(CleanCity::new)
                .collect(Collectors.toList());
    }
}
