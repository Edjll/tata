package ru.sstu.tata.dto;

import lombok.Data;
import ru.sstu.tata.database.entity.User;

@Data
public class OperatorResponse {
    private Long id;
    private String name;
    private String surname;
    private String username;
    private Boolean enabled;

    public OperatorResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.username = user.getUsername();
        this.enabled = user.isEnabled();
    }
}
