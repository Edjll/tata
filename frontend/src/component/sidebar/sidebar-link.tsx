import React from "react";
import {Link} from "react-router-dom";

interface SidebarLinkProps {
    to: string,
    text: string,
    icon: string
}

export const SidebarLink = ({to, text, icon}: SidebarLinkProps) => {
    return (
        <Link className={'sidebar__link'} to={to}>
            <img className={'sidebar__link__icon'} src={icon} alt={text}/>
            <span className={'sidebar__link__text'}>{text}</span>
        </Link>
    );
}