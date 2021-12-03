import React from "react";
import {Link} from "react-router-dom";

interface AdminLinkProps {
    to: string,
    text: string,
    icon: string
}

export const AdminLink = ({to, text, icon}: AdminLinkProps) => {
    return (
        <Link className={'admin__menu__link'} to={to}>
            <img className={'admin__menu__link__icon'} src={icon} alt={text}/>
            <span className={'admin__menu__link__name'}>{text}</span>
        </Link>
    );
}