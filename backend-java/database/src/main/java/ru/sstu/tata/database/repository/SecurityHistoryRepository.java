package ru.sstu.tata.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sstu.tata.database.entity.SecurityHistory;

@Repository
public interface SecurityHistoryRepository extends JpaRepository<SecurityHistory, Long> {

}
