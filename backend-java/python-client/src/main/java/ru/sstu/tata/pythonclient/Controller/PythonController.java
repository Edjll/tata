package ru.sstu.tata.pythonclient.Controller;


import org.springframework.web.bind.annotation.*;
import ru.sstu.tata.pythonclient.dto.CameraResponseDto;

@RestController("api/v1/python")
public class PythonController {


    @PostMapping
    public void getResult(@RequestBody CameraResponseDto cameraResponseDto){

    }
}
