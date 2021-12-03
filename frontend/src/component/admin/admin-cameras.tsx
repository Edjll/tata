import {Table} from "../table/table";
import {TableTitle} from "../table/table-title";
import {TableHeader} from "../table/table-header";
import {TableCell} from "../table/table-cell";
import {TableContent} from "../table/table-content";
import {TableRow} from "../table/table-row";
import {TableToolbar} from "../table/table-toolbar";
import {TablePagination} from "../table/table-pagination";
import {TableToolbarLink} from "../table/table-toolbar-link";
import {useEffect, useState} from "react";
import {RequestService} from "../../service/request-service";

interface Camera {
    id: number,
    longitude: number
    latitude: number,
    address: string,
    ip: string
}

export const AdminCameras = () => {

    const [cameras, setCameras] = useState<Camera []>([]);

    useEffect(() => {
        RequestService
            .getInstance()
            .get(RequestService.BACKEND_URL + 'v1/cameras')
            .then(response => {
                setCameras(response.data);
            })
    }, []);

    return (
        <Table>
            <TableTitle>Камеры</TableTitle>
            <TableHeader>
                <TableCell>ID</TableCell>
                <TableCell>IP</TableCell>
                <TableCell>Адрес</TableCell>
                <TableCell>Долгота</TableCell>
                <TableCell>Широта</TableCell>
            </TableHeader>
            <TableContent>
                {
                    cameras.map(
                        (camera, index) =>
                            <TableRow key={index}>
                                <TableCell>{camera.id}</TableCell>
                                <TableCell>{camera.ip}</TableCell>
                                <TableCell>{camera.address}</TableCell>
                                <TableCell>{camera.longitude}</TableCell>
                                <TableCell>{camera.latitude}</TableCell>
                            </TableRow>
                    )
                }
            </TableContent>
            <TableToolbar>
                <TablePagination pageNumber={0} pageCount={12} maxButtons={5} clickHandler={() => {}}/>
                <TableToolbarLink to={'/admin/operators/registration'}>Добавить</TableToolbarLink>
            </TableToolbar>
        </Table>
    )
}