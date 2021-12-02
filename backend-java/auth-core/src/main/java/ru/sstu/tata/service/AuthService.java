package ru.sstu.tata.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ru.sstu.tata.database.entity.RefreshToken;
import ru.sstu.tata.database.entity.User;
import ru.sstu.tata.dto.TokenRequest;
import ru.sstu.tata.dto.TokenResponse;

import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final JwtService jwtService;

    private final RefreshTokenService refreshTokenService;

    private final SecurityHistoryService securityHistoryService;

    private final AuthenticationManager authenticationManager;

    public Optional<TokenResponse> getToken(TokenRequest tokenRequest, String ip) {
        switch (tokenRequest.getType()) {
            case PASSWORD:
                return Optional.of(getTokenByUsernameAndPassword(tokenRequest, ip));
            case REFRESH_TOKEN:
                return Optional.of(getTokenByRefreshToken(tokenRequest, ip));
        }
        return Optional.empty();
    }

    private TokenResponse getTokenByRefreshToken(TokenRequest tokenRequest, String ip) {
        Optional<RefreshToken> refreshToken = refreshTokenService.findByToken(tokenRequest.getRefreshToken());
        if (!refreshToken.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if (!refreshTokenService.validateExpires(refreshToken.get())) {
            refreshTokenService.deleteToken(refreshToken.get().getId());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        tokenRequest.setUsername(refreshToken.get().getUser().getUsername());
        tokenRequest.setPassword(refreshToken.get().getUser().getPassword());

        return getTokenByUsernameAndPassword(tokenRequest, ip);
    }

    private TokenResponse getTokenByUsernameAndPassword(TokenRequest tokenRequest, String ip) {
        Authentication authentication = authenticate(tokenRequest.getUsername(), tokenRequest.getPassword());

        User user = (User) authentication.getPrincipal();

        Date jwtExpires = jwtService.getTokenExpires();
        String jwt = jwtService.generateToken(user, jwtExpires);

        RefreshToken refreshToken = refreshTokenService.createToken(user);

        securityHistoryService.createHistory(user, tokenRequest.getType(), ip);

        return new TokenResponse(
                jwt,
                jwtExpires.getTime(),
                refreshToken.getToken(),
                refreshToken.getExpires().getTime()
        );
    }

    private Authentication authenticate(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return authentication;
    }
}
