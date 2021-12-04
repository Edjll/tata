package ru.sstu.tata.database.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Camera {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ip;

    private String address;

    private Double latitude; //ширина

    private Double longitude; //долгота

    @Column(columnDefinition = "TIME")
    private LocalTime startTime; //время начала проверки

    @Column(columnDefinition = "TIME")
    private LocalTime interval; //время после startTime (часы)

    private LocalDateTime lastCheck; //время последней проверки

}
