import {ReactNode} from "react";

interface TableToolbarProps {
    children: ReactNode
}

export const TableToolbar = ({children}: TableToolbarProps) => {
    return (
        <div className={'table__toolbar'}>
            {children}
        </div>
    );
}