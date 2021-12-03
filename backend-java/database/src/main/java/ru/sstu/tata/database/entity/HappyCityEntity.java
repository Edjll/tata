package ru.sstu.tata.database.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class HappyCityEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String image64;

    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private List<AnimalEntity> objects;

    private LocalDateTime date;

    @ManyToOne
    private Camera camera;
}
