package ru.sstu.tata.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.sstu.tata.database.entity.CleanCityEntity;
import ru.sstu.tata.database.entity.HappyCityEntity;
import ru.sstu.tata.database.entity.RecordStatus;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Record {

    private Long id;

    private String image;

    private LocalDateTime date;

    private Integer service;

    private RecordStatus status;

    private String operator;

    private Double fullConfidence;

    private Double emptyConfidence;

    public Record(CleanCityEntity cleanCityEntity) {
        this.id = cleanCityEntity.getId();
        this.image = new String(cleanCityEntity.getImage64());
        this.date = cleanCityEntity.getDate();
        this.service = 0;
        this.status = cleanCityEntity.getStatus();
        if (cleanCityEntity.getOperator() != null)
            this.operator = cleanCityEntity.getOperator().getName() + ' ' + cleanCityEntity.getOperator().getSurname();
        this.fullConfidence = cleanCityEntity.getFullConfidence();
        this.emptyConfidence = cleanCityEntity.getEmptyConfidence();
    }

    public Record(HappyCityEntity happyCityEntity) {
        this.id = happyCityEntity.getId();
        this.image = happyCityEntity.getImage64();
        this.date = happyCityEntity.getDate();
        this.service = 1;
        this.status = happyCityEntity.getStatus();
        if (happyCityEntity.getOperator() != null)
            this.operator = happyCityEntity.getOperator().getName() + ' ' + happyCityEntity.getOperator().getSurname();
    }
}
