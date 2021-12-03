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

interface User {
    id: number,
    username: string,
    name: string,
    surname: string
}

export const AdminOperators = () => {

    const [users, setUsers] = useState<User []>([]);

    useEffect(() => {
        RequestService
            .getInstance()
            .get(RequestService.BACKEND_URL + 'v1/operators')
            .then(response => {
                setUsers(response.data);
            })
    }, []);

    return (
        <Table>
            <TableTitle>Операторы</TableTitle>
            <TableHeader>
                <TableCell>ID</TableCell>
                <TableCell>Псевдоним</TableCell>
                <TableCell>Имя</TableCell>
                <TableCell>Фамилия</TableCell>
            </TableHeader>
            <TableContent>
                {
                    users.map(
                        (user, index) =>
                            <TableRow key={index}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.surname}</TableCell>
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