import Sucursal from "./Sucursal";
import Button from "../UI/Button/Button";

const SucursalList = (props) => {
    const sendRowUpdateHandler = (data) =>{
        props.onUpdate();
        props.onAddUpdateRow(data);        
    }
    
  let sucursalList = "";

  sucursalList = (
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>{props.name}</th>
          <th>{props.admin}</th>
          <th>{props.actions}</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((sucursal) => (
          <Sucursal key={sucursal.id}>
            <td>
              {sucursal.nombre}
            </td>
            <td>{sucursal.nombre_admin}</td>
            <td>
              <Button class="btn btn-success" sucursal={sucursal.id} onClick={() => {sendRowUpdateHandler(sucursal)}}>Editar</Button>
              <Button class="btn btn-danger">Eliminar</Button>
            </td>
          </Sucursal>
        ))}
      </tbody>
    </table>
  );

  return sucursalList;
};

export default SucursalList;
