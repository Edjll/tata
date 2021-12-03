import {ReactNode} from "react";
import ClassNameService from "../../service/class-name-service";

interface CardFooterProps {
    children: ReactNode,
    className?: string
}

export const CardFooter = ({children, className}: CardFooterProps) => {
    return (
        <div className={ClassNameService.generateString('card__footer', className)}>
            {children}
        </div>
    )
}