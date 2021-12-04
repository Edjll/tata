package ru.sstu.tata.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sstu.tata.database.entity.HappyCityEntity;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HappyCityRepository extends JpaRepository<HappyCityEntity, Long> {

    List<HappyCityEntity> findAllByCameraIdAndDateBetween(Long cameraId, LocalDateTime start, LocalDateTime end);
}
