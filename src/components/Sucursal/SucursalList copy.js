import Sucursal from "./Sucursal";
import Button from "../UI/Button/Button";

const SucursalList = (props) => {
    const updateRowHandler = (data) =>{
        props.openModal();
        props.onUpdateRow(data);        
    }

    const deleteRowHandler = (data) =>{
        props.onDeleteRow(data);
    }

    console.log(props);

  //let sucursalList = "";  
  //sucursalList = (
  return (
   
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>{props.name}</th>
          <th>{props.admin}</th>
          <th>{props.dir}</th>
          <th>{props.tel}</th>
          <th>{props.pedidos}</th>
          <th>{props.actions}</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((sucursal) => (
          <Sucursal key={sucursal.id}>
            <td>{sucursal.nombre}</td>
            <td>{sucursal.nombre_admin}</td>
            <td>{sucursal.direccion}</td>
            <td>{sucursal.telefono}</td>
            <td>{sucursal.cantidad_pedidos}</td>
            <td>
              <Button class="btn btn-success" sucursal={sucursal.id} onClick={() => {updateRowHandler(sucursal)}}>Editar</Button>
              <Button class="btn btn-danger" sucursal={sucursal.id} onClick={() => {deleteRowHandler(sucursal)}}>Eliminar</Button>
            </td>
          </Sucursal>
        ))}
      </tbody>
    </table>    
  );
  
};

export default SucursalList;
