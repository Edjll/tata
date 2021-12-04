package ru.sstu.tata.service;


import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import ru.sstu.tata.database.entity.CleanCityEntity;
import ru.sstu.tata.database.repository.CameraRepository;
import ru.sstu.tata.database.repository.CleanCityRepository;
import ru.sstu.tata.dto.TrashDTO;

import java.io.File;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Base64;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KafkaService {

    private final CameraRepository cameraRepository;
    private final CleanCityRepository cleanCityRepository;
    private final String RELATIVE_PATH = "\\backend-java\\trash_can\\";

    public void createFromDto(TrashDTO trashDTO) {
        CleanCityEntity cleanCityEntity = new CleanCityEntity();
        cleanCityEntity.setDate(LocalDateTime.now());
        cleanCityEntity.setImage64(getImageAsBase64(trashDTO.getImage()));
        cleanCityEntity.setEmptyConfidence(Double.parseDouble(trashDTO.getPrediction_unfilled()));
        cleanCityEntity.setFullConfidence(Double.parseDouble(trashDTO.getPrediction_filled()));
        cleanCityEntity.setCamera(cameraRepository.findById(trashDTO.getId_camera()).get());
        cleanCityRepository.save(cleanCityEntity);
    }

    @SneakyThrows
    private byte[] getImageAsBase64(Long id) {
        String workingDir = System.getProperty("user.dir");
        Optional<File> image = Arrays.stream(new File(workingDir + RELATIVE_PATH).listFiles())
                .filter(file -> file.getName().startsWith(id + "_")).findFirst();
        if (image.isPresent()) {
            return Base64.getEncoder().encode(Files.readAllBytes(image.get().toPath()));
        }
        return new byte[0];
    }
}
