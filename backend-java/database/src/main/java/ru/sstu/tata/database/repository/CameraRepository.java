package ru.sstu.tata.database.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import ru.sstu.tata.database.entity.Camera;

public interface CameraRepository extends PagingAndSortingRepository<Camera, Long> {
}
