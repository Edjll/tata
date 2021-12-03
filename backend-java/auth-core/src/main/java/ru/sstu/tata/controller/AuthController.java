package ru.sstu.tata.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.sstu.tata.dto.TokenRequest;
import ru.sstu.tata.dto.TokenResponse;
import ru.sstu.tata.service.AuthService;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

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

    @GetMapping("/v1/auth/verify")
    public ResponseEntity<?> verifyToken() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/v1/auth/logout")
    public ResponseEntity<?> logout(Principal principal) {
        authService.logout(principal);
        return ResponseEntity.ok().build();
    }
}
