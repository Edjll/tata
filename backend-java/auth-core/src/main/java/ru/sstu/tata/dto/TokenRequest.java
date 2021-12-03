package ru.sstu.tata.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.sstu.tata.database.entity.AuthType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenRequest {

    private String username;

    private String password;

    private String refreshToken;

    private AuthType type;
}
