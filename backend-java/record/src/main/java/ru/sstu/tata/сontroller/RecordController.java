package ru.sstu.tata.сontroller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.sstu.tata.dto.ChangeRecordRequest;
import ru.sstu.tata.dto.Record;
import ru.sstu.tata.service.RecordService;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class RecordController {

    private final RecordService recordService;

    @GetMapping("/v1/records")
    public List<Record> getRecords() {
       return recordService.getRecords();
    }

    @GetMapping("/v1/records/clean-city/{id}")
    public Record getCleanCityRecord(@PathVariable Long id) {
        return recordService.getCleanCityRecord(id);
    }

    @GetMapping("/v1/records/friend-of-human/{id}")
    public Record getFriendOfHumanRecord(@PathVariable Long id) {
        return recordService.getFriendOfHumanRecord(id);
    }

    @PutMapping("/v1/records/clean-city/{id}")
    public Record changeCleanCityRecord(@PathVariable Long id, @RequestBody ChangeRecordRequest changeRecordRequest, Principal principal) {
        return recordService.changeCleanCityRecord(id, changeRecordRequest, principal);
    }

    @PutMapping("/v1/records/friend-of-human/{id}")
    public Record changeFriendOfHumanRecord(@PathVariable Long id, @RequestBody ChangeRecordRequest changeRecordRequest, Principal principal) {
        return recordService.changeFriendOfHumanRecord(id, changeRecordRequest, principal);
    }
}
