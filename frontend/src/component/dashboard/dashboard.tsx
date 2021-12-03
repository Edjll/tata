import {Sidebar} from "../sidebar/sidebar";
import {SidebarLink} from "../sidebar/sidebar-link";
import {useState} from "react";
import pandaImage from '../../images/panda.png';
import trashImage from '../../images/trash.png';
import './dashboard.css';

interface Record {
    id: number,
    service: number,
    date: Date,
    resolved: boolean
}

export const Dashboard = () => {

    const services = ['Чистый город', 'Друг человека'];
    const icons = [trashImage, pandaImage];

    const [records, setRecords] = useState([
        {
            id: 1,
            service: 0,
            date: new Date(),
            resolved: false
        }
    ]);

    return (
        <div className={'dashboard'}>
            <Sidebar>
                {
                    records.map((record, index) => <SidebarLink key={index} to={`/dashboard/${record.id}`}
                                                                text={services[record.service]}
                                                                icon={icons[record.service]}/>)
                }
            </Sidebar>
            <div className={'dashboard__panel'}>

            </div>
        </div>
    );
}