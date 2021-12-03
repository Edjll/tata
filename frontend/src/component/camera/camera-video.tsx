import './camera-video.css';
import ClassNameService from "../../service/class-name-service";
import video from "../../videos/video.mp4";
import {Card} from "../card/card";
import React from "react";

interface CameraVideoProps {
    className?: string
}

export const CameraVideo = ({className}: CameraVideoProps) => {
    return (
        <Card className={ClassNameService.generateString('camera-video', className)}>
            <video className={'camera-video__video'} src={video}/>
        </Card>
    )
}