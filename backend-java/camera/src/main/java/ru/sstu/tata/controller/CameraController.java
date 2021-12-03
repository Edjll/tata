package ru.sstu.tata.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import ru.sstu.tata.database.entity.Camera;
import ru.sstu.tata.dto.CameraRequest;
import ru.sstu.tata.dto.UpdateCameraRequest;
import ru.sstu.tata.service.CameraService;

import javax.annotation.PostConstruct;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class CameraController {

    private final CameraService cameraService;

    @GetMapping("/v1/cameras")
    public Page<Camera> getAllPageable(@RequestParam(required = false, defaultValue = "false") Boolean pagination,
                                       @RequestParam(required = false, defaultValue = "0") Integer page) {
        return cameraService.getAllPageable(pagination, page);
    }

    @PostMapping("/v1/cameras")
    public Camera createCamera(@RequestBody CameraRequest cameraRequest) {
        return cameraService.createCamera(cameraRequest);
    }

    @PutMapping("/api/v1/cameras")
    public Camera updateCamera(@RequestBody UpdateCameraRequest cameraRequest) {
        return cameraService.updateCamera(cameraRequest);
    }
}
