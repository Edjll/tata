import {ReactNode} from "react";

interface TableHeaderProps {
    children: ReactNode
}

export const TableHeader = ({children}: TableHeaderProps) => {

    return (
        <div className="table__header">
            {children}
        </div>
    )
};