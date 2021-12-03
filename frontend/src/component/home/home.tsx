import './home.css';
import background from '../../images/background.jpg';
import {HomeService} from "./home-service";
import cleanCityImage from '../../images/clean-city.png';

export const Home = () => {
    return (
        <div className={'home'}>
            <div className={'home__banner'}>
                <img className={'home__banner__image'} src={background} alt={'banner'}/>
            </div>
            <div className={'home__services'}>
                <h2 className={'home__services__title'}>Наши сервисы</h2>
                <div className={'home__services__items'}>
                    <HomeService
                        title={'Чистый город'}
                        description={'Сервис позволяющий отслеживать заполненные мусорные баки'}
                        image={cleanCityImage}
                        link={'/clean-city'}
                    />
                    <HomeService
                        title={'Друг человека'}
                        description={'Сервис позволяющий отслеживать бездомных животных'}
                        image={cleanCityImage}
                        link={'/friend-of-human'}
                    />
                </div>
            </div>
        </div>
    )
}