import './camera-info.css';
import {Card} from "../card/card";
import {CardHeader} from "../card/card-header";
import {useEffect, useState} from "react";
import image from "../../images/background.jpg";
import {useParams} from "react-router-dom";
import {CardBody} from "../card/card-body";
import {RequestService} from "../../service/request-service";

interface Camera {
    id: number,
    address: string,
    latitude: number,
    longitude: number,
    ip: string
}

export const CameraInfo = () => {
    const [camera, setCamera] = useState<Camera | null>(null);
    const params = useParams();

    useEffect(() => {
        RequestService
            .getInstance()
            .get(RequestService.BACKEND_URL + 'v1/cameras/' + params.id)
            .then(response => setCamera(response.data));
    }, []);

    return (
        <Card className={'camera-info'}>
            <CardHeader>Информация о камере</CardHeader>
            <CardBody className={'camera-info__body'}>
                <span className={'camera-info__attribute'}>Адрес:</span>
                <span className={'camera-info__value'}>{camera?.address}</span>
                <span className={'camera-info__attribute'}>Долгота:</span>
                <span className={'camera-info__value'}>{camera?.longitude}</span>
                <span className={'camera-info__attribute'}>Широта:</span>
                <span className={'camera-info__value'}>{camera?.latitude}</span>
            </CardBody>
        </Card>
    )
}