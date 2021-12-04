package ru.sstu.tata.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrashDTO {
    private Long id_camera;
    private String prediction_unfilled;
    private String prediction_filled;
    private Long image;
}
