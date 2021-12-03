import {Table} from "../table/table";
import {TableTitle} from "../table/table-title";
import {TableHeader} from "../table/table-header";
import {TableCell} from "../table/table-cell";
import {TableRow} from "../table/table-row";
import {TableToolbar} from "../table/table-toolbar";
import {TablePagination} from "../table/table-pagination";
import {TableToolbarLink} from "../table/table-toolbar-link";
import {useEffect, useState} from "react";
import {RequestService} from "../../service/request-service";
import {TableContent} from "../table/table-content";

interface Camera {
    id: number,
    longitude: number
    latitude: number,
    address: string,
    ip: string,
    startTime: string,
    interval: string
}

export const AdminCameras = () => {

    const [cameras, setCameras] = useState<Camera []>([]);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        sendRequest(0);
    }, []);


    const sendRequest = (page: number) => {
        RequestService
            .getInstance()
            .get(
                RequestService.BACKEND_URL + 'v1/cameras',
                {
                    params: {
                        pagination: true,
                        page: page
                    }
                }
            )
            .then(response => {
                setCameras(response.data.content);
                setPage(response.data.number);
                setPageCount(response.data.totalPages);
            })
    }

    return (
        <Table>
            <TableTitle>Камеры</TableTitle>
            <TableContent>
                <TableHeader>
                    <TableCell>ID</TableCell>
                    <TableCell>IP</TableCell>
                    <TableCell>Адрес</TableCell>
                    <TableCell>Долгота</TableCell>
                    <TableCell>Широта</TableCell>
                    <TableCell>Время запуска</TableCell>
                    <TableCell>Интервал</TableCell>
                </TableHeader>
                {
                    cameras.map(
                        (camera, index) =>
                            <TableRow key={index}>
                                <TableCell>{camera.id}</TableCell>
                                <TableCell>{camera.ip}</TableCell>
                                <TableCell>{camera.address}</TableCell>
                                <TableCell>{camera.longitude}</TableCell>
                                <TableCell>{camera.latitude}</TableCell>
                                <TableCell>{camera.startTime}</TableCell>
                                <TableCell>{camera.interval}</TableCell>
                            </TableRow>
                    )
                }
            </TableContent>
            <TableToolbar>
                <TablePagination pageNumber={page} pageCount={pageCount} maxButtons={5} clickHandler={(page: number) => sendRequest(page)}/>
                <TableToolbarLink to={'/admin/cameras/registration'}>Добавить</TableToolbarLink>
            </TableToolbar>
        </Table>
    )
}