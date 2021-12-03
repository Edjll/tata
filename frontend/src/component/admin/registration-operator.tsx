import React, {useState} from "react";
import {Card} from "../card/card";
import {CardHeader} from "../card/card-header";
import {CardBody} from "../card/card-body";
import {FormInput} from "../form/form-input";
import {FormInputType} from "../form/form-input-type";
import {CardFooter} from "../card/card-footer";
import './registration.css';
import {useNavigate} from "react-router-dom";
import {RequestService} from "../../service/request-service";

export const RegistrationOperator = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
        RequestService.getInstance().post(
            RequestService.BACKEND_URL + 'v1/operators',
            {
                username: username,
                surname: surname,
                name: name,
                password: password
            }
        ).then(response => {
            navigate(`/admin/operators`);
        })
    }

    return (
        <div className={'registration'}>
            <Card className={'registration__card'}>
                <CardHeader className={'registration__card__header'}>Регистарция оператора</CardHeader>
                <CardBody className={'registration__card__body'}>
                    <FormInput title={'Логин'} value={username} inputHandler={setUsername}/>
                    <FormInput title={'Имя'} value={name} inputHandler={setName}/>
                    <FormInput title={'Фамилия'} value={surname} inputHandler={setSurname}/>
                    <FormInput title={'Пароль'} value={password} inputHandler={setPassword} type={FormInputType.PASSWORD}/>
                </CardBody>
                <CardFooter>
                    <button className={'registration__button'} onClick={() => submit()}>Зарегистрировать</button>
                </CardFooter>
            </Card>
        </div>
    )
}