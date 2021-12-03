import {ReactNode} from "react";

interface TableContentProps {
    children: ReactNode
}

export const TableContent = ({children}: TableContentProps) => {
    return (
        <div className={'table__content'}>
            {children}
        </div>
    )
};