package ru.sstu.tata.pythonclient.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableScheduling
public class RestTemplateConfig {


    @Bean
    public RestTemplate createRestTemplate(){
        return new RestTemplate();
    }
}
