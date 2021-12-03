package ru.sstu.tata.database.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.sstu.tata.database.entity.Camera;

import java.util.Date;

public interface CameraRepository extends PagingAndSortingRepository<Camera, Long> {

    Camera getCameraByLastCheckIsBefore(Date date);
}
