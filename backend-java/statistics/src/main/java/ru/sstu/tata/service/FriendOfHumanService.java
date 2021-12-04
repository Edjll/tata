package ru.sstu.tata.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.sstu.tata.database.repository.HappyCityRepository;
import ru.sstu.tata.dto.FriendOfHuman;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FriendOfHumanService {

    private final HappyCityRepository happyCityRepository;

    public List<FriendOfHuman> getStatistics(Long cameraId) {
        return happyCityRepository
                .findAllByCameraIdAndDateBetween(cameraId, LocalDate.now().atStartOfDay(), LocalDate.now().plusDays(1).atStartOfDay())
                .stream()
                .map(FriendOfHuman::new)
                .collect(Collectors.toList());
    }
}