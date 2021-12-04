package ru.sstu.tata.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.sstu.tata.database.entity.CleanCityEntity;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CleanCity {

    private LocalDateTime date;

    private double fullConfidence;

    private double emptyConfidence;

    public CleanCity(CleanCityEntity cleanCityEntity) {
        this.date = cleanCityEntity.getDate();
        this.fullConfidence = cleanCityEntity.getFullConfidence();
        this.emptyConfidence = cleanCityEntity.getEmptyConfidence();
    }
}
