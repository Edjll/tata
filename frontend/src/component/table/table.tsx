import {ReactNode} from "react";
import './table.css';

interface TableProps {
    children: ReactNode
}

export const Table = ({children}: TableProps) => {

    return (
        <div className="table">{children}</div>
    )
};