package ru.sstu.tata.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ru.sstu.tata.database.entity.Role;
import ru.sstu.tata.database.entity.User;
import ru.sstu.tata.database.repository.UserRepository;
import ru.sstu.tata.dto.OperatorRequest;
import ru.sstu.tata.dto.OperatorResponse;
import ru.sstu.tata.dto.UpdateOperatorRequest;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OperatorService {

    private final UserRepository userRepository;

    public void createOperator(OperatorRequest operatorRequest) {
        Optional<User> optionalUser = userRepository.findByUsername(operatorRequest.getUsername());
        if (optionalUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Such operator is already exist");
        }
        User newUser = createUserFromOperator(operatorRequest);
        userRepository.save(newUser);
    }

    private User createUserFromOperator(OperatorRequest operatorRequest) {
        return User.builder()
                .username(operatorRequest.getUsername())
                .password(operatorRequest.getPassword())
                .name(operatorRequest.getName())
                .surname(operatorRequest.getSurname())
                .role(Role.OPERATOR)
                .build();
    }

    public List<OperatorResponse> getAllPageable(Integer page) {
        Page<User> operators = userRepository.findByRole(Role.OPERATOR, PageRequest.of(page, 10));
        return operators.getContent().stream().map(OperatorResponse::new).collect(Collectors.toList());
    }

    public OperatorResponse updateOperator(UpdateOperatorRequest updateRequest) {
        Optional<User> optionalUser = userRepository.findById(updateRequest.getId());
        User user = optionalUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        user.setIsEnabled(updateRequest.getEnabled());
        return new OperatorResponse(userRepository.save(user));
    }
}
