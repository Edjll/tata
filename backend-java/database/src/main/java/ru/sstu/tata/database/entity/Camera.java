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

    private LocalTime startTime;

    private LocalDateTime lastCheck;

    //время старта | date при регитсрации
    //последний запуск | date обновляю после отправки в питон

}
