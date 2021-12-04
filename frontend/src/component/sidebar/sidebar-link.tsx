import React, {ReactNode} from "react";
import {Link} from "react-router-dom";
import ClassNameService from "../../service/class-name-service";

interface SidebarLinkProps {
    to: string,
    children: ReactNode,
    icon: string,
    className?: string
}

export const SidebarLink = ({to, children, icon, className}: SidebarLinkProps) => {
    return (
        <Link className={ClassNameService.generateString('sidebar__link', className)} to={to}>
            <img className={'sidebar__link__icon'} src={icon} alt={'icon'}/>
            <div className={'sidebar__link__text'}>{children}</div>
        </Link>
    );
}