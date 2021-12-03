package ru.sstu.tata.pythonclient.schedulers;


import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import ru.sstu.tata.pythonclient.service.PythonClientService;

@Component
@RequiredArgsConstructor
public class CameraScheduler {

    private final PythonClientService pythonClientService;


    @Scheduled(fixedDelay = 5000)
    public void scheduleFixedDelayTask() {
        pythonClientService.sendCamera(null);
    }
}
