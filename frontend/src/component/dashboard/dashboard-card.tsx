import './dashboard-card.css';
import {CardHeader} from "../card/card-header";
import {Card} from "../card/card";
import {CardBody} from "../card/card-body";
import image from '../../images/background.jpg';
import {CardFooter} from "../card/card-footer";
import {Record, RecordStatus, recordStatusIcons, services} from "./dashboard";
import {useEffect, useState} from "react";
import {RequestService} from "../../service/request-service";
import {useParams} from "react-router-dom";

export const DashboardCard = () => {
    const [record, setRecord] = useState<Record | null>(null);
    const params = useParams();

    useEffect(() => {
        RequestService
            .getInstance()
            .get(RequestService.BACKEND_URL + 'v1/records/' + params.service + '/' + params.id)
            .then(response => setRecord(response.data));
    }, [params]);

    const sendChangeRequest = (value: RecordStatus) => {
        if (record !== null) {
            RequestService
                .getInstance()
                .put(
                    RequestService.BACKEND_URL + 'v1/records/' + services[record?.service].path + '/' + params.id,
                    {
                        status: value
                    }
                ).then(response => setRecord(response.data));
        }
    }

    const approve = () => {
        sendChangeRequest(RecordStatus.APPROVED);
    }

    const reject = () => {
        sendChangeRequest(RecordStatus.REJECTED);
    }

    return (
        <Card className={'dashboard-card'}>
            <CardHeader>
                <span className={'dashboard-card__title'}>{record ? services[record.service].title : ''}</span>
                {
                    record && record.status !== RecordStatus.WAITING
                        ?   <img className={'dashboard-card__icon'} src={recordStatusIcons[record.status]} alt={record.status}/>
                        :   null
                }
            </CardHeader>
            <CardBody className={'dashboard-card__body'}>
                <img className={'dashboard-card__image'} src={'data:image/png;base64,' + record?.image} alt={'image'}/>
            </CardBody>
            <CardFooter className={'dashboard-card__footer'}>
                <div className={'dashboard-card__confidences'}>
                    <span className={'dashboard-card__confidences__item dashboard-card__confidences__item_full'}>Вероятность заполненности: {record?.fullConfidence}</span>
                    <span className={'dashboard-card__confidences__item dashboard-card__confidences__item_empty'}>Вероятность пустоты: {record?.emptyConfidence}</span>
                </div>
                <div className={'dashboard-card__buttons'}>
                    <button className={'dashboard-card__button dashboard-card__button_reject'} onClick={() => reject()}>Ничего нет</button>
                    {
                        record?.operator
                            ?   <span className={'dashboard-card__modifier'}>Решение принял: {record.operator}</span>
                            :   null
                    }
                    <button className={'dashboard-card__button dashboard-card__button_approve'} onClick={() => approve()}>Подтверждаю</button>
                </div>
            </CardFooter>
        </Card>
    )
}