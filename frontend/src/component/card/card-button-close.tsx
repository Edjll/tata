import React from "react";
import ClassNameService from "../../service/class-name-service";
import {useNavigate} from "react-router-dom";

interface CardHeaderProps {
    className?: string
}

export const CardButtonClose = ({className}: CardHeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className={ClassNameService.generateString('card__button-close', className)} onClick={() => navigate(-1)}>
            ⨉
        </div>
    )
}