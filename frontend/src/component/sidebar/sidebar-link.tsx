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
            {children}
        </Link>
    );
}

interface SidebarLinkIconProps {
    icon: string
}

export const SidebarLinkIcon = ({icon}: SidebarLinkIconProps) => {
    return (<img className={'sidebar__link__icon'} src={icon} alt={'icon'}/>);
}

interface SidebarLinkBodyProps {
    children: ReactNode
}

export const SidebarLinkBody = ({children}: SidebarLinkBodyProps) => {
    return (<div className={'sidebar__link__body'}>{children}</div>);
}

interface SidebarLinkAfterProps {
    children: ReactNode
}

export const SidebarLinkAfter = ({children}: SidebarLinkAfterProps) => {
    return (<div className={'sidebar__link__after'}>{children}</div>);
}