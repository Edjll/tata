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
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        sendRequest(0);
    }, []);

    const sendRequest = (page: number) => {
        RequestService
            .getInstance()
            .get(
                RequestService.BACKEND_URL + 'v1/operators',
                {
                    params: {
                        pagination: true,
                        page: page
                    }
                }
            )
            .then(response => {
                setUsers(response.data.content);
                setPage(response.data.number);
                setPageCount(response.data.totalPages);
            })
    }

    return (
        <Table>
            <TableTitle>Операторы</TableTitle>
            <TableContent>
                <TableHeader>
                    <TableCell>ID</TableCell>
                    <TableCell>Псевдоним</TableCell>
                    <TableCell>Имя</TableCell>
                    <TableCell>Фамилия</TableCell>
                </TableHeader>
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
                <TablePagination pageNumber={page} pageCount={pageCount} maxButtons={5} clickHandler={(page: number) => sendRequest(page)}/>
                <TableToolbarLink to={'/admin/operators/registration'}>Добавить</TableToolbarLink>
            </TableToolbar>
        </Table>
    )
}