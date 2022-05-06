import Sucursal from "./Sucursal";
import Button from "../UI/Button/Button";
import { Table } from "react-bootstrap";


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
                            <Button class="btn btn-success" onClick={props.onEdit}>Editar</Button>

                            <Button class="btn btn-danger">Eliminar</Button>
                        </td>
                    </Sucursal>
                ))}
            </tbody>
        </Table>
    );

    return sucursalList;
}

export default SucursalList;