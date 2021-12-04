package ru.sstu.tata.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.sstu.tata.dto.FriendOfHuman;
import ru.sstu.tata.service.FriendOfHumanService;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class FriendOfHumanController {

    private final FriendOfHumanService friendOfHumanService;

    @GetMapping("/v1/statistics/friend-of-human")
    public List<FriendOfHuman> getStatistics(@RequestParam Long cameraId) {
        return friendOfHumanService.getStatistics(cameraId);
    }
}