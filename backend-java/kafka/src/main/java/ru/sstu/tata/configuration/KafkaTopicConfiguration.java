package ru.sstu.tata.configuration;

import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaAdmin;
import org.springframework.kafka.core.KafkaTemplate;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaTopicConfiguration {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapAddress;

    @Value("${spring.kafka.producer-topic}")
    private String producerTopic;

    @Bean
    public KafkaAdmin kafkaAdmin() {
        Map<String, Object> configs = new HashMap<>();
        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        return new KafkaAdmin(configs);
    }

    @Bean
    public NewTopic topicCamera() {
        return new NewTopic(producerTopic, 1, (short) 1);
    }

//    @Autowired
//    private KafkaTemplate<String, String> kafkaTemplate;

//    @PostConstruct
//    public void sendMessage() {
//        for (int i = 0; i < 50; i++) {
//            kafkaTemplate.send(producerTopic, "{\"id\":1,\"ip\":\"192.168.0.0\"}");
//        }
//    }
}
