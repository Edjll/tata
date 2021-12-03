package ru.sstu.tata.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sstu.tata.dto.OperatorRequest;
import ru.sstu.tata.dto.OperatorResponse;
import ru.sstu.tata.dto.UpdateOperatorRequest;
import ru.sstu.tata.service.OperatorService;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class OperatorController {

    private final OperatorService operatorService;

    @GetMapping("/v1/operators")
    public Page<OperatorResponse> getAllOperators(@RequestParam Integer page) {
        return operatorService.getAllPageable(page);
    }

    @PostMapping("/v1/operators")
    public ResponseEntity<?> createOperator(@RequestBody OperatorRequest operatorRequest) {
        operatorService.createOperator(operatorRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/v1/operators")
    public OperatorResponse updateOperator(@RequestBody UpdateOperatorRequest updateRequest) {
        return operatorService.updateOperator(updateRequest);
    }
}
