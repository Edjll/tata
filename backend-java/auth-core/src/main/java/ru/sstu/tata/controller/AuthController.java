package ru.sstu.tata.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.sstu.tata.dto.TokenRequest;
import ru.sstu.tata.dto.TokenResponse;
import ru.sstu.tata.service.AuthService;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;

    @PostMapping("/v1/auth/token")
    public ResponseEntity<TokenResponse> getToken(@RequestBody TokenRequest tokenRequest, HttpServletRequest request) {
        return authService
                .getToken(tokenRequest, request.getRemoteAddr())
                .map(response -> ResponseEntity.ok().body(response))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
