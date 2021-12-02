package ru.sstu.tata.entrypoint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "ru.sstu.tata")
@EnableJpaRepositories(basePackages = "ru.sstu.tata.database.repository")
@EntityScan("ru.sstu.tata.database.entity")
public class Entrypoint {

    public static void main(String[] args) {
        SpringApplication.run(Entrypoint.class, args);
    }
}
