package ru.sstu.tata.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CameraRequest {
    private String ip;
    private String address;
    private Double latitude;
    private Double longitude;
    private LocalTime startTime;
    private LocalTime interval;
}
