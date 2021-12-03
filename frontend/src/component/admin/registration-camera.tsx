import React, {useState} from "react";
import {Card} from "../card/card";
import {CardHeader} from "../card/card-header";
import {CardBody} from "../card/card-body";
import {FormInput} from "../form/form-input";
import {CardFooter} from "../card/card-footer";
import './registration.css';
import {RequestService} from "../../service/request-service";
import {useNavigate} from "react-router-dom";

export const RegistrationCamera = () => {
    const navigate = useNavigate();
    const [ip, setIp] = useState('');
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [address, setAddress] = useState('');

    const submit = () => {
        RequestService.getInstance().post(
            RequestService.BACKEND_URL + 'cameras',
            {
                ip: ip,
                x: x,
                y: y,
                address: address
            }
        ).then(response => {
            console.log(123);
            navigate(`/clean-city/${response.data.id}`);
        })
    }

    return (
        <div className={'registration'}>
            <Card className={'registration__card'}>
                <CardHeader className={'registration__card__header'}>Регистрация камеры</CardHeader>
                <CardBody className={'registration__card__body'}>
                    <FormInput title={'IP адрес'} value={ip} inputHandler={setIp}/>
                    <FormInput title={'Долгота'} value={x} inputHandler={setX}/>
                    <FormInput title={'Широта'} value={y} inputHandler={setY}/>
                    <FormInput title={'Адрес'} value={address} inputHandler={setAddress}/>
                </CardBody>
                <CardFooter>
                    <button className={'registration__button'} onClick={() => submit()}>Зарегистрировать</button>
                </CardFooter>
            </Card>
        </div>
    )
}