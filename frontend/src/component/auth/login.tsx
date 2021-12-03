import './login.css';
import {Card} from "../card/card";
import {CardHeader} from "../card/card-header";
import {CardBody} from "../card/card-body";
import React, {useState} from "react";
import {FormInput} from "../form/form-input";
import {CardFooter} from "../card/card-footer";
import {FormInputType} from "../form/form-input-type";
import {AuthService} from "../../service/auth-service";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
        AuthService.login(username, password);
    }

    return (
        <div className={'login'}>
            <Card className={'login__card'}>
                <CardHeader className={'login__card__header'}>
                    <span className={'login__card__header__title'}>Вход в систему</span>
                </CardHeader>
                <CardBody className={'login__card__body'}>
                    <FormInput title={'Логин'} value={username} inputHandler={setUsername}/>
                    <FormInput title={'Пароль'} value={password} inputHandler={setPassword}
                               type={FormInputType.PASSWORD}/>
                </CardBody>
                <CardFooter>
                    <button className={'login__button'} onClick={() => submit()}>Войти</button>
                </CardFooter>
            </Card>
        </div>
    )
}