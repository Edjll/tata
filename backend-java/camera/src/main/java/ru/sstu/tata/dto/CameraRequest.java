package ru.sstu.tata.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CameraRequest {
    private String ip;
    private String address;
    private Double latitude;
    private Double longitude;
}
