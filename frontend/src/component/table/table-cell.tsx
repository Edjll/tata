import './table.css';
import {ReactNode} from "react";

interface TableCellProps {
    children: ReactNode
}

export const TableCell = ({children}: TableCellProps) => {

    return (
        <td className="table__cell">
            {children}
        </td>
    )
}