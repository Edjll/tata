package ru.sstu.tata.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.sstu.tata.database.entity.HappyCityEntity;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendOfHuman {

    private LocalDateTime date;

    private int count;

    public FriendOfHuman(HappyCityEntity happyCityEntity) {
        this.date = happyCityEntity.getDate();
        this.count = happyCityEntity.getObjects().size();
    }
}
