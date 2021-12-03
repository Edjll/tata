import './header.css';
import logo from '../../images/logo.png';
import {Link, useLocation} from "react-router-dom";
import {HeaderServices} from "./header-services";
import {PrivateLink} from "../../private/private-link";
import {Role} from "../../service/role";
import {AuthService} from "../../service/auth-service";

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
                        location.pathname === '/' || location.pathname.includes('/admin') ? null : <HeaderServices/>
                    }
                    <PrivateLink roles={[Role.ADMIN]} to={'/admin'} className={'header__link'}>Админка</PrivateLink>
                    {
                        !AuthService.isAuthenticated()
                            ?   <Link to={'/login'} className={'header__link'}>Войти</Link>
                            :   <button className={'header__link'} onClick={() => AuthService.logout()}>Выйти</button>
                    }
                </div>
            </div>
        </header>
    )
}