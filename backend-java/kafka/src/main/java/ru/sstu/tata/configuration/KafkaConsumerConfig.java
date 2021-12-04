package ru.sstu.tata.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.scheduling.annotation.EnableScheduling;
import ru.sstu.tata.dto.TrashDTO;
import ru.sstu.tata.service.KafkaService;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@EnableKafka
@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class KafkaConsumerConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapAddress;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final KafkaService kafkaService;

    @Bean
    public ConsumerFactory<String, String> consumerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                bootstrapAddress);
        props.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "group1");
        props.put(
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
                StringDeserializer.class);
        props.put(
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
                StringDeserializer.class);
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,
                "earliest");
        return new DefaultKafkaConsumerFactory<>(props);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, String> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }

    @KafkaListener(topics = "detect-trash", groupId = "group1")
    public void listenGroupFoo(String message) {
        log.info("Retrieved trash detection from neuron network: {}", message);
        TrashDTO trashDTO = null;
        try {
            trashDTO = objectMapper.readValue(message, TrashDTO.class);
        } catch (Exception ex) {
            log.error("Something went wrong");
        }
        if (trashDTO != null) {
            kafkaService.createFromDto(trashDTO);
        }
    }
}