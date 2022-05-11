import React, { useState, useContext, useEffect } from "react";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
//import Alert from "../UI/Alert/Alert";
import SucursalContext from "../../store/sucursal-context";
import "react-toastify/dist/ReactToastify.css";
import Alert from "../UI/Alert/Alert";

const SucursalForm = (props) => {
  const sucursalCtx = useContext(SucursalContext);
  
  const [valores, setValores] = useState(sucursalCtx);

  const inputChangeHandler = (event) => {
    const { target } = event;
    const { name, value } = target;
    const newValues = {
      ...valores,
      [name]: value,
    };
    setValores(newValues);
  };

  async function addSucursalHandler(sucursal) {
    const response = await fetch("http://127.0.0.1:8000/api/sucursal", {
      method: "POST",      
      body: JSON.stringify(sucursal),
      headers: {
        "Content-Type": "application/json",       
      },
    });
    const data = await response.json();

    if(data.respuesta !== "success"){
      Alert("warning", data.mensaje);      
    } else {      
      setValores(valores);
      props.onAddSucursal(valores);      
      Alert("success", data.mensaje);
    }    
  }

  async function editSucursalHandler(sucursal) {
    const response = await fetch(
      "http://127.0.0.1:8000/api/sucursal/" + sucursal.id,
      {
        method: "PUT",
        body: JSON.stringify(sucursal),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();    
    if(data.respuesta !== "success"){
      Alert("warning", data.mensaje);      
    } else {            
      props.onUpdateSucursal(valores);
      Alert("success", data.mensaje);
    }   
  }

  function submitHandler(event) {
    event.preventDefault();
    if (sucursalCtx.id > 0) {
      editSucursalHandler(valores);     
    } else {
      addSucursalHandler(valores);     
    }
    props.onClose();
    
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
            value={valores.nombre}
            required
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
            value={valores.nombre_admin}
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
            value={valores.telefono}
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
            value={valores.direccion}
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
            value={valores.fax}
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
            value={valores.cantidad_pedidos}
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
