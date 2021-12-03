import {ReactNode} from "react";

interface TableHeaderProps {
    children: ReactNode
}

export const TableHeader = ({children}: TableHeaderProps) => {

    return (
        <tr className="table__header">
            {children}
        </tr>
    )
};