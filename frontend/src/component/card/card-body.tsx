import {ReactNode} from "react";
import ClassNameService from "../../service/class-name-service";

interface CardBodyProps {
    children: ReactNode,
    className?: string
}

export const CardBody = ({children, className}: CardBodyProps) => {
    return (
        <div className={ClassNameService.generateString('card__body', className)}>
            {children}
        </div>
    )
}