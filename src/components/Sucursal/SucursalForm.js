import React, { useState } from "react";

import Button from "../UI/Button/Button";
//import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";

const SucursalForm = (props) => {

    const datos = {
        nombre: "",
        nombre_admin: "",
        telefono: "",
        direccion: "",
        fax: "",
        cantidad_pedidos: ""
    }
  const [valores, setValores] = useState(datos);

  const inputChangeHandler = (event) => {
    const { target } = event;
    const { name, value } = target;

    const newValues = {
      ...valores,
      [name]: value,
    };

    setValores(newValues);

    //setEnteredNombre(event.target.value);
    console.log(event);
  };

  function submitHandler(event) {
    event.preventDefault();

    
    props.onAddSucursal(valores);
    console.log(valores);
  }

  return (
    <Modal onClose={props.onClose}>
      <h2>{props.title}</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            className="form-control"
            id="nombre"
            name="nombre"
            type="text"
            onChange={inputChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="admin" className="form-label">
            Nombre de adminstrador
          </label>
          <input
            className="form-control"
            id="nombre_admin"
            name="nombre_admin"
            type="text"
            onChange={inputChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono
          </label>
          <input
            className="form-control"
            id="telefono"
            name="telefono"
            type="text"
            onChange={inputChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección
          </label>
          <input
            className="form-control"
            id="direccion"
            name="direccion"
            type="text"
            onChange={inputChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fax" className="form-label">
            Fax
          </label>
          <input
            className="form-control"
            id="fax"
            name="fax"
            type="text"
            onChange={inputChangeHandler}
          />
        </div>       
        <div className="mb-3">
          <label htmlFor="cantidad_pedidos" className="form-label">
            Cantidad de pedidos
          </label>
          <input
            className="form-control"
            id="cantidad_pedidos"
            name="cantidad_pedidos"
            type="number"
            onChange={inputChangeHandler}
          />
        </div>
        <Button type="button" class="btn btn-danger" onClick={props.onClose}>
          Cancelar
        </Button>
        <Button type="submit" class="btn btn-primary">
          Guardar
        </Button>
      </form>
    </Modal>
  );
};

export default SucursalForm;
