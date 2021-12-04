package ru.sstu.tata.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ru.sstu.tata.database.entity.CleanCityEntity;
import ru.sstu.tata.database.entity.HappyCityEntity;
import ru.sstu.tata.database.entity.User;
import ru.sstu.tata.database.repository.CleanCityRepository;
import ru.sstu.tata.database.repository.HappyCityRepository;
import ru.sstu.tata.database.repository.UserRepository;
import ru.sstu.tata.dto.ChangeRecordRequest;
import ru.sstu.tata.dto.Record;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RecordService {

    private final CleanCityRepository cleanCityRepository;

    private final HappyCityRepository happyCityRepository;

    private final UserRepository userRepository;

    public List<Record> getRecords() {
        List<Record> records = new ArrayList<>();

        records.addAll(getFriendOfHumanRecords());
        records.addAll(getCleanCityRecords());
        records.sort(Comparator.comparing(Record::getDate));

        return records;
    }

    private List<Record> getFriendOfHumanRecords() {
        return happyCityRepository
                .findAll()
                .stream()
                .map(Record::new)
                .collect(Collectors.toList());
    }

    private List<Record> getCleanCityRecords() {
        return cleanCityRepository
                .findAll()
                .stream()
                .map(Record::new)
                .collect(Collectors.toList());
    }

    public Record changeCleanCityRecord(Long id, ChangeRecordRequest changeRecordRequest, Principal principal) {
        CleanCityEntity cleanCityEntity = cleanCityRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        cleanCityEntity.setOperator(userRepository.findByUsername(principal.getName()).get());
        cleanCityEntity.setStatus(changeRecordRequest.getStatus());

        return new Record(cleanCityRepository.save(cleanCityEntity));
    }

    public Record changeFriendOfHumanRecord(Long id, ChangeRecordRequest changeRecordRequest, Principal principal) {
        HappyCityEntity happyCityEntity = happyCityRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        happyCityEntity.setOperator(userRepository.findByUsername(principal.getName()).get());
        happyCityEntity.setStatus(changeRecordRequest.getStatus());

        return new Record(happyCityRepository.save(happyCityEntity));
    }

    public Record getCleanCityRecord(Long id) {
        return new Record(cleanCityRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }

    public Record getFriendOfHumanRecord(Long id) {
        return new Record(happyCityRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }
}