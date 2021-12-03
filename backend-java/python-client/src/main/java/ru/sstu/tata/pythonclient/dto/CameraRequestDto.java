package ru.sstu.tata.pythonclient.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CameraRequestDto {
    private Integer id;
    private String ip;
}
