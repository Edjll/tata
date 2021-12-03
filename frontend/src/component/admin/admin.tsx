import React from "react";
import './admin.css';
import keyIcon from "../../images/icons8-door-key-64.png";
import listIcon from "../../images/icons8-list-64.png"
import cameraIcon from "../../images/icons8-camera-96.png"
import {AdminLink} from "./admin-link";
import {Outlet} from "react-router-dom";

export const Admin = () => {
    return (
        <div className={'admin'}>
            <div className={'admin__menu'}>
                <div className={'admin__menu__wrapper'}>
                    <AdminLink to={'/admin/operators/registration'} text={'Зарегестирировать оператора'} icon={keyIcon}/>
                    <AdminLink to={'/admin/operators'} text={'Список операторов'} icon={listIcon}/>
                    <AdminLink to={'/admin/cameras/registration'} text={'Зарегестрировать камеру'} icon={cameraIcon}/>
                    <AdminLink to={'/admin/cameras'} text={'Список камер'} icon={listIcon}/>
                </div>
            </div>
            <div className={'admin__panel'}>
                <Outlet/>
            </div>
        </div>
    )
}