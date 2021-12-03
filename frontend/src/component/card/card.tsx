import './card.css';
import {ReactNode} from "react";
import ClassNameService from "../../service/class-name-service";

interface CardProps {
    children: ReactNode,
    className?: string
}

export const Card = ({children, className}: CardProps) => {
    return (
        <div className={ClassNameService.generateString('card', className)}>
            {children}
        </div>
    )
}