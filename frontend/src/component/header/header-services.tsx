import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ClassNameService from "../../service/class-name-service";
import arrowIcon from '../../images/arrow-down.png';

export const HeaderServices = () => {
    const [currentService, setCurrentService] = useState(0);
    const services = [{path: '/clean-city', name: 'Чистый город'}, {path: '/friend-of-human', name: 'Друг человека'}];

    const [active, setActive] = useState(false);

    const documentClickEventListener = (e: MouseEvent): void => {
        const target = e.target as HTMLElement;
        if (!target.closest('.header__services') && active) {
            setActive(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', documentClickEventListener);
        return () => {
            document.removeEventListener('click', documentClickEventListener);
        }
    });

    return (
        <div className={ClassNameService.generateString('header__services', active ? 'header__services_active' : undefined)} onClick={() => setActive(!active)}>
            <div className={'header__services__selected'}>
                <span className={'header__services__selected__text'}>{services[currentService].name}</span>
                <img className={'header__services__selected__icon'} src={arrowIcon} alt={'down'}/>
            </div>
            <div className={'header__services__values'}>
                {
                    services.map(
                        (service, index) =>
                            <Link className={'header__services__item'} key={index} to={service.path}
                                  onClick={() => setCurrentService(index)}>{service.name}</Link>
                    )
                }
            </div>
        </div>
    )
}