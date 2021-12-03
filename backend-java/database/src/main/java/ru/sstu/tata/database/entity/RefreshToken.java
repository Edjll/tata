package ru.sstu.tata.database.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String token;

    private Date expires;

    @OneToOne
    private User user;

    public RefreshToken(String token, Date expires, User user) {
        this.token = token;
        this.expires = expires;
        this.user = user;
    }
}
