package ru.sstu.tata.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.sstu.tata.database.entity.AuthType;
import ru.sstu.tata.database.entity.SecurityHistory;
import ru.sstu.tata.database.entity.User;
import ru.sstu.tata.database.repository.SecurityHistoryRepository;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class SecurityHistoryService {

    private final SecurityHistoryRepository securityHistoryRepository;

    public SecurityHistory createHistory(User user, AuthType type, String ip) {
        SecurityHistory securityHistory = new SecurityHistory();
        securityHistory.setUser(user);
        securityHistory.setType(type);
        securityHistory.setIp(ip);
        securityHistory.setDate(LocalDateTime.now());
        return securityHistoryRepository.save(securityHistory);
    }
}
