import React, {useState} from "react";
import {Card} from "../card/card";
import {CardHeader} from "../card/card-header";
import {CardBody} from "../card/card-body";
import {FormInput} from "../form/form-input";
import {CardFooter} from "../card/card-footer";
import './registration.css';
import {RequestService} from "../../service/request-service";
import {useNavigate} from "react-router-dom";
import {FormInputType} from "../form/form-input-type";

export const RegistrationCamera = () => {
    const navigate = useNavigate();
    const [ip, setIp] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [address, setAddress] = useState('');
    const [startTime, setStartTime] = useState('');
    const [interval, setInterval] = useState('');

    const submit = () => {
        RequestService.getInstance().post(
            RequestService.BACKEND_URL + 'v1/cameras',
            {
                ip: ip,
                longitude: longitude,
                latitude: latitude,
                address: address,
                startTime: startTime,
                interval: interval
            }
        ).then(response => {
            navigate(`/clean-city/${response.data.id}`);
        })
    }

    return (
        <div className={'registration'}>
            <Card className={'registration__card'}>
                <CardHeader className={'registration__card__header'}>Регистрация камеры</CardHeader>
                <CardBody className={'registration__card__body'}>
                    <FormInput title={'IP адрес'} value={ip} inputHandler={setIp}/>
                    <FormInput title={'Долгота'} value={longitude} inputHandler={setLongitude}/>
                    <FormInput title={'Широта'} value={latitude} inputHandler={setLatitude}/>
                    <FormInput title={'Адрес'} value={address} inputHandler={setAddress}/>
                    <FormInput title={'Время запуска'} value={startTime} inputHandler={setStartTime} type={FormInputType.TIME} hasPlaceholder={true}/>
                    <FormInput title={'Интервал'} value={address} inputHandler={setInterval} type={FormInputType.TIME} hasPlaceholder={true}/>
                </CardBody>
                <CardFooter>
                    <button className={'registration__button'} onClick={() => submit()}>Зарегистрировать</button>
                </CardFooter>
            </Card>
        </div>
    )
}