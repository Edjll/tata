package ru.sstu.tata.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ru.sstu.tata.database.entity.Camera;
import ru.sstu.tata.database.repository.CameraRepository;
import ru.sstu.tata.dto.CameraRequest;
import ru.sstu.tata.dto.UpdateCameraRequest;

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

    public Camera getCamera(Long id) {
        return cameraRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
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
}
