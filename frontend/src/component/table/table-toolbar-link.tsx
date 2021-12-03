import {ReactNode} from "react";
import {Link} from "react-router-dom";

interface TableToolbarLinkProps {
    children: ReactNode,
    to: string
}

export const TableToolbarLink = ({children, to}: TableToolbarLinkProps) => {


    return (
        <Link to={to} className={'table__toolbar__link'}>
            {children}
        </Link>
    )
}