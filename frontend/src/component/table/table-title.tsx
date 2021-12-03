import {ReactNode} from "react";

interface TableTitleProps {
    children: ReactNode
}

export const TableTitle = ({children}: TableTitleProps) => {
    return (
        <div className={'table__title'}>{children}</div>
    );
}