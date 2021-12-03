package ru.sstu.tata.database.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

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

    private LocalDateTime startTime; //время начала проверки

    private LocalDateTime interval; //время после startTime (часы)

    private LocalDateTime lastCheck; //время последней проверки

}
