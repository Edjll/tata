import './header.css';
import logo from '../../images/logo.png';
import {Link, useLocation} from "react-router-dom";
import {HeaderServices} from "./header-services";

export const Header = () => {
    const location = useLocation();

    return (
        <header className={'header'}>
            <div className={'header__wrapper'}>
                <Link to={'/'} className={'header__logo'}>
                    <img className={'header__logo__image'} src={logo} alt="logo"/>
                    <span className={'header__logo__text'}>Название</span>
                </Link>
                <div className={'header__navigation'}>
                    {
                        location.pathname === '/' ? null : <HeaderServices/>
                    }
                    <Link to={'/admin'} className={'header__link'}>Админка</Link>
                    <Link to={'/login'} className={'header__link'}>Войти</Link>
                </div>
            </div>
        </header>
    )
}