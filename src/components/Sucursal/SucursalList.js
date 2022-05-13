import Sucursal from "./Sucursal";
import Button from "../UI/Button/Button";

const SucursalList = (props) => {
  const updateRowHandler = (data) => {
    props.openModal();
    props.onUpdateRow(data);
  };

  const deleteRowHandler = (data) => {
    props.onDeleteRow(data);
  };

  return (
    <>
      {props.items &&
        props.items.map((sucursal) => (
          <Sucursal key={sucursal.id}>
            <td>{sucursal.nombre}</td>
            <td>{sucursal.nombre_admin}</td>
            <td>{sucursal.direccion}</td>
            <td>{sucursal.telefono}</td>
            <td>{sucursal.cantidad_pedidos}</td>
            <td>
              <Button
                class="btn btn-success"
                sucursal={sucursal.id}
                onClick={() => {
                  updateRowHandler(sucursal);
                }}
              >
                Editar
              </Button>
              <Button
                class="btn btn-danger"
                sucursal={sucursal.id}
                onClick={() => {
                  deleteRowHandler(sucursal);
                }}
              >
                Eliminar
              </Button>
            </td>
          </Sucursal>
        ))}
    </>
  );
};

export default SucursalList;
