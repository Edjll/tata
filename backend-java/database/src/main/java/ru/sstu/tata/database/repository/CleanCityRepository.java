package ru.sstu.tata.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sstu.tata.database.entity.CleanCityEntity;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CleanCityRepository extends JpaRepository<CleanCityEntity, Long> {

    List<CleanCityEntity> findAllByCameraIdAndDateAfterOrderByDateAsc(Long cameraId, LocalDateTime date);
}
