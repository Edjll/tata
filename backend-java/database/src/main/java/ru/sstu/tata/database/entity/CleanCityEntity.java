package ru.sstu.tata.database.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CleanCityEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String image64;

    private Double fullConfidence;

    private Double emptyConfidence;

    private LocalDateTime date;

    @ManyToOne
    private Camera camera;

}
