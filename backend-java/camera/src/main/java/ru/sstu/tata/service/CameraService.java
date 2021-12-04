package ru.sstu.tata.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ru.sstu.tata.database.entity.Camera;
import ru.sstu.tata.database.repository.CameraRepository;
import ru.sstu.tata.dto.CameraRequest;
import ru.sstu.tata.dto.UpdateCameraRequest;

import javax.annotation.PostConstruct;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CameraService {

    private final CameraRepository cameraRepository;

    public Page<Camera> getAllPageable(Boolean pagination, Integer page) {
        Pageable pageRequest = pagination ? PageRequest.of(page, 10) : Pageable.unpaged();
        return cameraRepository.findAll(pageRequest);
    }

    public Camera createCamera(CameraRequest cameraRequest) {
        return cameraRepository.save(createCameraFromRequest(cameraRequest));
    }

    public Camera getCamera(Long id) {
        return cameraRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }


    public Camera updateCamera(UpdateCameraRequest cameraRequest) {
        return cameraRepository.save(createCameraFromRequest(cameraRequest));
    }

    private Camera createCameraFromRequest(CameraRequest cameraRequest) {
        return Camera.builder()
                .ip(cameraRequest.getIp())
                .address(cameraRequest.getAddress())
                .latitude(cameraRequest.getLatitude())
                .longitude(cameraRequest.getLongitude())
                .startTime(cameraRequest.getStartTime())
                .interval(cameraRequest.getInterval())
                .build();
    }

    private Camera createCameraFromRequest(UpdateCameraRequest cameraRequest) {
        return Camera.builder()
                .id(cameraRequest.getId())
                .ip(cameraRequest.getIp())
                .address(cameraRequest.getAddress())
                .latitude(cameraRequest.getLatitude())
                .longitude(cameraRequest.getLongitude())
                .build();
    }

    //54.89705930266575 - min longitude
    //59.960622914832285 - max longitude
    //30.333209398741175 - min latitude
    //52.296570598536796 - max latitude

    //comment me if use real data
    @PostConstruct
    private void mockCameraData() {
        List<Camera> cameraList = new ArrayList<>();
        for (int i = 0; i < 58; i++) {
            Camera camera = new Camera();
            camera.setId((long) i);
            camera.setIp("192.168.0.0"); //neuron-be нужен лишь id камеры
            camera.setAddress("Саратов, ул. Московская");
            camera.setStartTime(LocalTime.now().plusHours(i % 12));
            camera.setInterval(LocalTime.now());
            cameraList.add(camera);
        }
        cameraList.get(0).setLongitude(54.90260106797759);
        cameraList.get(1).setLongitude(54.90050649986876);
        cameraList.get(2).setLongitude(54.89705930266575);
        cameraList.get(3).setLongitude(54.90605554939705);
        cameraList.get(4).setLongitude(54.90648254789255);
        cameraList.get(5).setLongitude(54.90601184955114);
        cameraList.get(6).setLongitude(54.90661328728115);
        cameraList.get(7).setLongitude(54.90654697593807);
        cameraList.get(8).setLongitude(54.90688567714912);
        cameraList.get(9).setLongitude(54.89817994658467);
        cameraList.get(10).setLongitude(54.900175747967076);
        cameraList.get(11).setLongitude(54.89887401336552);
        cameraList.get(12).setLongitude(54.89621224202146);
        cameraList.get(13).setLongitude(54.90128109037803);
        cameraList.get(14).setLongitude(54.902432511905175);
        cameraList.get(15).setLongitude(54.902488030745516);
        cameraList.get(16).setLongitude(55.82769218366873);
        cameraList.get(17).setLongitude(55.81992241135113);
        cameraList.get(18).setLongitude(55.86790388036422);
        cameraList.get(19).setLongitude(55.78535390843874);
        cameraList.get(20).setLongitude(55.78528741334123);
        cameraList.get(21).setLongitude(55.7632086874065);
        cameraList.get(22).setLongitude(55.76307589084504);
        cameraList.get(23).setLongitude(55.86594095628986);
        cameraList.get(24).setLongitude(59.960622914832285);
        cameraList.get(25).setLongitude(55.86353567660977);
        cameraList.get(26).setLongitude(55.86324438045876);
        cameraList.get(27).setLongitude(55.860211899363264);
        cameraList.get(28).setLongitude(55.86015921407492);
        cameraList.get(29).setLongitude(55.860077928061386);
        cameraList.get(30).setLongitude(55.86005986447971);
        cameraList.get(31).setLongitude(55.859987610069076);
        cameraList.get(32).setLongitude(55.86005835918087);
        cameraList.get(33).setLongitude(55.86031425914773);
        cameraList.get(34).setLongitude(55.8606544529707);
        cameraList.get(35).setLongitude(55.86073874832318);
        cameraList.get(36).setLongitude(55.86065746352217);
        cameraList.get(37).setLongitude(55.86072461252524);
        cameraList.get(38).setLongitude(55.86041163631821);
        cameraList.get(39).setLongitude(55.86038684601582);
        cameraList.get(40).setLongitude(55.775906202378756);
        cameraList.get(41).setLongitude(55.7853207050582);
        cameraList.get(42).setLongitude(55.768554902147976);
        cameraList.get(43).setLongitude(55.78259699073612);
        cameraList.get(44).setLongitude(55.78245822710806);
        cameraList.get(45).setLongitude(55.782138648388056);
        cameraList.get(46).setLongitude(55.78828853003531);
        cameraList.get(47).setLongitude(55.81457584412747);
        cameraList.get(48).setLongitude(55.787211630363856);
        cameraList.get(49).setLongitude(55.791796715801965);
        cameraList.get(50).setLongitude(55.79116940659693);
        cameraList.get(51).setLongitude(55.86012121967408);
        cameraList.get(52).setLongitude(55.8275640373536);
        cameraList.get(53).setLongitude(55.79570962878769);
        cameraList.get(54).setLongitude(55.80075494922639);
        cameraList.get(55).setLongitude(55.79254019409906);
        cameraList.get(56).setLongitude(55.78878940624064);
        cameraList.get(57).setLongitude(55.79052569702039);
        cameraList.get(0).setLatitude(52.28965530172472);
        cameraList.get(1).setLatitude(52.28734926970033);
        cameraList.get(2).setLatitude(52.296570598536796);
        cameraList.get(3).setLatitude(52.27084271202732);
        cameraList.get(4).setLatitude(52.26646211388362);
        cameraList.get(5).setLatitude(52.26424788319066);
        cameraList.get(6).setLatitude(52.263780279691865);
        cameraList.get(7).setLatitude(52.263180712523365);
        cameraList.get(8).setLatitude(52.262893683750754);
        cameraList.get(9).setLatitude(52.27367382551718);
        cameraList.get(10).setLatitude(52.29013215435389);
        cameraList.get(11).setLatitude(52.28566831388341);
        cameraList.get(12).setLatitude(52.288361869700076);
        cameraList.get(13).setLatitude(52.26878569853695);
        cameraList.get(14).setLatitude(52.26993688319055);
        cameraList.get(15).setLatitude(52.26993688319057);
        cameraList.get(16).setLatitude(49.0674567120637);
        cameraList.get(17).setLatitude(49.132282698573185);
        cameraList.get(18).setLatitude(49.015911283228625);
        cameraList.get(19).setLatitude(49.18549657313105);
        cameraList.get(20).setLatitude(49.18489955488477);
        cameraList.get(21).setLatitude(49.1909739408978);
        cameraList.get(22).setLatitude(49.191252890649814);
        cameraList.get(23).setLatitude(49.08671370414396);
        cameraList.get(24).setLatitude(30.333209398741175);
        cameraList.get(25).setLatitude(49.08318706788196);
        cameraList.get(26).setLatitude(49.08291303345065);
        cameraList.get(27).setLatitude(49.08128187763278);
        cameraList.get(28).setLatitude(49.08160374273127);
        cameraList.get(29).setLatitude(49.082134820143764);
        cameraList.get(30).setLatitude(49.08217773549023);
        cameraList.get(31).setLatitude(49.08270344848441);
        cameraList.get(32).setLatitude(49.08319697496876);
        cameraList.get(33).setLatitude(49.081204093567315);
        cameraList.get(34).setLatitude(49.08266321534435);
        cameraList.get(35).setLatitude(49.08188805689883);
        cameraList.get(36).setLatitude(49.081362343904644);
        cameraList.get(37).setLatitude(49.081746296627934);
        cameraList.get(38).setLatitude(49.08167451572752);
        cameraList.get(39).setLatitude(49.082447540808985);
        cameraList.get(40).setLatitude(49.2162275139179);
        cameraList.get(41).setLatitude(49.15100301020566);
        cameraList.get(42).setLatitude(49.1704730556793);
        cameraList.get(43).setLatitude(49.154013629254706);
        cameraList.get(44).setLatitude(49.1546118426982);
        cameraList.get(45).setLatitude(49.15429030297233);
        cameraList.get(46).setLatitude(49.120447440898644);
        cameraList.get(47).setLatitude(49.052784967880115);
        cameraList.get(48).setLatitude(49.106077098571845);
        cameraList.get(49).setLatitude(49.10758647208772);
        cameraList.get(50).setLatitude(49.10827311763115);
        cameraList.get(51).setLatitude(49.10170052555505);
        cameraList.get(52).setLatitude(49.02357540712372);
        cameraList.get(53).setLatitude(49.11015869857231);
        cameraList.get(54).setLatitude(49.276771898572356);
        cameraList.get(55).setLatitude(49.15574229329261);
        cameraList.get(56).setLatitude(49.123234877656685);
        cameraList.get(57).setLatitude(49.10275701020586);
        cameraList.forEach(cameraRepository::save);
    }
}
