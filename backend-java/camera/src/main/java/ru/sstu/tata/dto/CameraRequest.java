package ru.sstu.tata.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CameraRequest {
    private String ip;
    private String address;
    private Double latitude;
    private Double longitude;
    private LocalDateTime startTime;
    private LocalDateTime interval;
}
