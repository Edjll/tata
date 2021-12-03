package ru.sstu.tata.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.sstu.tata.database.entity.Camera;
import ru.sstu.tata.database.repository.CameraRepository;
import ru.sstu.tata.dto.CameraRequest;
import ru.sstu.tata.dto.UpdateCameraRequest;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CameraService {

    private final CameraRepository cameraRepository;

    public Page<Camera> getAllPageable(Boolean pagination, Integer page) {
        Pageable pageRequest = pagination ? PageRequest.of(page, 10) : Pageable.unpaged();
        return cameraRepository.findAll(pageRequest);
    }

    public Camera createCamera(CameraRequest cameraRequest) {
        return cameraRepository.save(createCameraFromRequest(cameraRequest));
    }


    public Camera updateCamera(UpdateCameraRequest cameraRequest) {
        return cameraRepository.save(createCameraFromRequest(cameraRequest));
    }

    private Camera createCameraFromRequest(CameraRequest cameraRequest) {
        return Camera.builder()
                .ip(cameraRequest.getIp())
                .address(cameraRequest.getAddress())
                .latitude(cameraRequest.getLatitude())
                .longitude(cameraRequest.getLongitude())
                .startTime(cameraRequest.getStartTime())
                .interval(cameraRequest.getInterval())
                .build();
    }

    private Camera createCameraFromRequest(UpdateCameraRequest cameraRequest) {
        return Camera.builder()
                .id(cameraRequest.getId())
                .ip(cameraRequest.getIp())
                .address(cameraRequest.getAddress())
                .latitude(cameraRequest.getLatitude())
                .longitude(cameraRequest.getLongitude())
                .build();
    }

    //54.89705930266575 - min longitude
    //59.960622914832285 - max longitude
    //30.333209398741175 - min latitude
    //52.296570598536796 - max latitude

    //comment me if use real data
    @PostConstruct
    private void mockCameraData(){
        double max_longitude = 59.960622914832285 - 54.89705930266575;
        double min_longitude = 54.89705930266575;
        double max_latitude = 52.296570598536796 - 30.333209398741175;
        double min_latitude = 30.333209398741175;
        for (int i = 0; i < 100; i ++) {
            Camera camera = new Camera();
            camera.setId((long) i);
            camera.setIp("192.168.0.0"); //neuron-be нужен лишь id камеры
            camera.setAddress("Саратов, ул. Московская");
            double tmp_1 = max_longitude;
            camera.setLongitude((Math.random() * ++tmp_1) + min_longitude);
            double tmp_2 = max_latitude;
            camera.setLatitude((Math.random() * ++tmp_2) + min_latitude);
            camera.setStartTime(LocalDateTime.now().plusHours(i%12));
            camera.setInterval(LocalDateTime.now());
            cameraRepository.save(camera);
        }

    }
}
