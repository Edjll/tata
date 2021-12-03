import {ReactNode} from "react";

interface TableContentProps {
    children: ReactNode
}

export const TableContent = ({children}: TableContentProps) => {
    return (
        <table className={'table__content'}>
            {children}
        </table>
    )
};