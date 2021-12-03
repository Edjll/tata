import {ReactNode} from "react";
import ClassNameService from "../../service/class-name-service";

interface CardHeaderProps {
    children: ReactNode,
    className?: string
}

export const CardHeader = ({children, className}: CardHeaderProps) => {
    return (
        <div className={ClassNameService.generateString('card__header', className)}>
            {children}
        </div>
    )
}