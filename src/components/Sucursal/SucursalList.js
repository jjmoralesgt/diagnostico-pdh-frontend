import Sucursal from "./Sucursal";
import { Button, Table } from "react-bootstrap";


const SucursalList = (props) => {
    let sucursalList = '';

    sucursalList = (

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        {props.name}
                    </th>
                    <th>
                        {props.admin}
                    </th>
                    <th>
                        {props.actions}
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.items.map((sucursal) => (
                    <Sucursal key={sucursal.id}>
                        <td>{sucursal.nombre}</td>
                        <td>{sucursal.nombre_admin}</td>
                        <td>
                            <Button variant="success">Editar</Button>

                            <Button variant="danger">Eliminar</Button>
                        </td>
                    </Sucursal>
                ))}
            </tbody>
        </Table>
    );

    return sucursalList;
}

export default SucursalList;