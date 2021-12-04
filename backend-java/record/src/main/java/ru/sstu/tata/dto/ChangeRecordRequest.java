package ru.sstu.tata.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.sstu.tata.database.entity.RecordStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangeRecordRequest {

    private RecordStatus status;
}
