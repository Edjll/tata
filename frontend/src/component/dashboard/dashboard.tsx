import {Sidebar} from "../sidebar/sidebar";
import {SidebarLink} from "../sidebar/sidebar-link";
import {useEffect, useState} from "react";
import pandaImage from '../../images/panda.png';
import trashImage from '../../images/trash.png';
import './dashboard.css';
import { Outlet } from "react-router-dom";
import {RequestService} from "../../service/request-service";

export interface Record {
    id: number,
    service: number,
    date: string,
    status: RecordStatus,
    image?: string,
    operator?: string
}

export interface Service {
    title: string,
    icon: string,
    path: string
}

export const services: Service [] = [
    {
        title: 'Чистый город',
        icon: trashImage,
        path: 'clean-city'
    }, {
        title: 'Друг человека',
        icon: pandaImage,
        path: 'friend-of-human'
    }
];

export enum RecordStatus {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    WAITING = "WAITING"
}

export const Dashboard = () => {

    const icons = [trashImage, pandaImage];

    const [records, setRecords] = useState<Record []>([]);

    useEffect(() => {
        RequestService
            .getInstance()
            .get(RequestService.BACKEND_URL + 'v1/records')
            .then(response => {
                setRecords(response.data);
            })
    }, []);

    return (
        <div className={'dashboard'}>
            <Sidebar>
                {
                    records.map(
                        (record, index) =>
                            <SidebarLink key={index} to={`/dashboard/${services[record.service].path}/${record.id}`} icon={icons[record.service]} className={'dashboard__link'}>
                                <div className={'dashboard__link__text'}>{services[record.service].title}</div>
                            </SidebarLink>
                    )
                }
            </Sidebar>
            <div className={'dashboard__panel'}>
                <Outlet/>
            </div>
        </div>
    );
}