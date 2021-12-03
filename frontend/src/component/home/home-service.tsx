import './home-service.css';
import {Card} from "../card/card";
import {Link} from "react-router-dom";

interface HomeServiceProps {
    image: string,
    title: string,
    description: string,
    link: string
}

export const HomeService = ({image, title, description, link}: HomeServiceProps) => {
    return (
        <Card className={'home-service'}>
            <div className={'home-service__info'}>
                <h3 className={'home-service__info__title'}>{title}</h3>
                <div className={'home-service__info__description'}>{description}</div>
                <Link className={'home-service__info__link'} to={link}>Перейти</Link>
            </div>
            <div className={'home-service__preview'}>
                <img className={'home-service__preview__image'} src={image} alt={title}/>
            </div>
        </Card>
    )
}