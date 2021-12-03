import React, {useState} from "react";
import {Card} from "../card/card";
import {CardHeader} from "../card/card-header";
import {CardBody} from "../card/card-body";
import {FormInput} from "../form/form-input";
import {FormInputType} from "../form/form-input-type";
import {CardFooter} from "../card/card-footer";
import './registration.css';

export const RegistrationOperator = () => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={'registration'}>
            <Card className={'registration__card'}>
                <CardHeader className={'registration__card__header'}>Регистарция оператора</CardHeader>
                <CardBody className={'registration__card__body'}>
                    <FormInput title={'Логин'} value={username} inputHandler={setUsername}/>
                    <FormInput title={'Имя'} value={firstname} inputHandler={setFirstName}/>
                    <FormInput title={'Фамилия'} value={lastname} inputHandler={setLastName}/>
                    <FormInput title={'Пароль'} value={password} inputHandler={setPassword} type={FormInputType.PASSWORD}/>
                </CardBody>
                <CardFooter>
                    <button className={'registration__button'}>Зарегистрировать</button>
                </CardFooter>
            </Card>
        </div>
    )
}