package ru.sstu.tata.pythonclient.service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ru.sstu.tata.database.entity.Camera;
import ru.sstu.tata.database.repository.CameraRepository;
import ru.sstu.tata.pythonclient.dto.CameraRequestDto;

import java.util.Calendar;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class PythonClientService {

    private final RestTemplate restTemplate;

    private final CameraRepository cameraRepository;

    @Value("${python.url}")
    private String url;
    public void sendCamera(CameraRequestDto cameraRequestDto){
        cameraRequestDto = new CameraRequestDto(1,"123");

        restTemplate.postForEntity(url,cameraRequestDto,CameraRequestDto.class);
    }


    public Camera getCameraForCheck(){
    }
}
