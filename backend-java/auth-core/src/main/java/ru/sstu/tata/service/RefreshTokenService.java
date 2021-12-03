package ru.sstu.tata.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.sstu.tata.database.entity.RefreshToken;
import ru.sstu.tata.database.entity.User;
import ru.sstu.tata.database.repository.RefreshTokenRepository;

import java.util.Base64;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {

    @Value("${token.refresh.secret}")
    private String secret;

    @Value("${token.refresh.expire}")
    private int expire;

    private final PasswordEncoder passwordEncoder;

    private final RefreshTokenRepository refreshTokenRepository;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createToken(User user) {
        String encryptedToken = passwordEncoder.encode(user.getId() + new Date().getTime() + user.getUsername() + secret);
        String encodedToken = Base64.getUrlEncoder().encodeToString(encryptedToken.getBytes());

        RefreshToken token = new RefreshToken(
                encodedToken,
                new Date(new Date().getTime() + expire),
                user
        );

        return refreshTokenRepository.save(token);
    }

    public void deleteToken(Long tokenId) {
        refreshTokenRepository.deleteById(tokenId);
    }

    public boolean validateExpires(RefreshToken refreshToken) {
        return refreshToken.getExpires().getTime() <= new Date().getTime();
    }
}
