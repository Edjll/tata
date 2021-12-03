package ru.sstu.tata.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.sstu.tata.database.entity.Camera;
import ru.sstu.tata.database.repository.CameraRepository;
import ru.sstu.tata.dto.CameraRequest;
import ru.sstu.tata.dto.UpdateCameraRequest;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CameraService {

    private final CameraRepository cameraRepository;

    public List<Camera> getAllPageable(Boolean pagination, Integer page) {
        Pageable pageRequest = pagination ? PageRequest.of(page, 10) : Pageable.unpaged();
        return cameraRepository.findAll(pageRequest).getContent();
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
}
