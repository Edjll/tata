import './table.css';
import {ReactNode} from "react";

interface TableRowProps {
    children: ReactNode
}

export const TableRow = ({children}: TableRowProps) => {

    return (
        <div className="table__row">
            {children}
        </div>
    )
};