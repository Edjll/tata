package ru.sstu.tata.shceduler;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import ru.sstu.tata.database.entity.Camera;
import ru.sstu.tata.database.repository.CameraRepository;

import java.util.Random;

@RequiredArgsConstructor
@Component
public class KafkaScheduler {

    private final KafkaTemplate kafkaTemplate;
    private final CameraRepository cameraRepository;
    @Value("${spring.kafka.producer-topic}")
    private String producerTopic;

    @Scheduled(fixedDelay = 5000)
    public void computePrice() throws InterruptedException {

        for(int i = 0; i < 5; i++){
            Random r = new Random();
            int randomInt = r.nextInt(100) + 1;
            Camera camera = null;

            try{
                camera = cameraRepository.findById((long)randomInt).get();
            }catch (Exception e){
                continue;
            }
            if(camera == null) continue;
            kafkaTemplate.send(producerTopic, String.format("{\"id\":%d,\"ip\":\"%s\"}",camera.getId(),camera.getIp()));


        }


    }

}
