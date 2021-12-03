package ru.sstu.tata.database.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

    OPERATOR, ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
