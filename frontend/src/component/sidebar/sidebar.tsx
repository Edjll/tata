import './sidebar.css';
import {ReactNode} from "react";

interface SidebarProps {
    children: ReactNode
}

export const Sidebar = ({children}: SidebarProps) => {
    return (
        <div className={'sidebar'}>
            <div className={'sidebar__wrapper'}>
                {children}
            </div>
        </div>
    );
}