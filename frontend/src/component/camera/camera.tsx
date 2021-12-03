import './camera.css';
import {ReactNode} from "react";

interface CameraProps {
    children: ReactNode,
    className?: string
}

export const Camera = ({children, className}: CameraProps) => {
    return (
        <div className={'camera'}>
            {children}
        </div>
    );
}