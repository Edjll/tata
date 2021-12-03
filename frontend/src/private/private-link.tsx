import {AuthService} from "../service/auth-service";
import {Role} from "../service/role";
import {Link, LinkProps} from "react-router-dom";
import * as React from "react";
import {ReactNode} from "react";

interface PrivateLinkProps {
    roles: Role [],
    to: string,
    children: ReactNode,
    className: string
}

export const PrivateLink = ({roles, to, children, className}: PrivateLinkProps) => {
    if (!AuthService.isAuthenticated())
        return null;

    if (!AuthService.hasRole(roles))
        return null;

    return (<Link to={to} className={className}>{children}</Link>)
}