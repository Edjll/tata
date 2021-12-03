import {ReactNode} from "react";

interface TableToolbarButtonProps {
    children: ReactNode
}

export const TableToolbarButton = ({children}: TableToolbarButtonProps) => {
    
    
    return (
        <button className={'table__toolbar__button'}>
            {children}
        </button>
    )
}