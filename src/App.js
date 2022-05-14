import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import SucursalProvider from "./store/SucursalProvider";
import Button from "./components/UI/Button/Button";
import SucursalForm from "./components/Sucursal/SucursalForm";
import Table from "./components/UI/Table/Table";
import Swal from "sweetalert2";
import Alert from "./components/UI/Alert/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [sucursals, setSucursals] = useState([]);  
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/sucursal")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            Alert("success", `Este es un error HTTP: El estado es ${response.status}`)            
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setSucursals(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setSucursals(null);
        console.log(error);
      })      
  }, []);

  const datos = {
    id: "",
    nombre: "",
    nombre_admin: "",
    telefono: "",
    direccion: "",
    fax: "",
    cantidad_pedidos: "",
  };

  const addSucursalHandler = (sucursal) => {
    setSucursals((prevSucursals) => {
      return [sucursal, ...prevSucursals];
    });
  };

  const [rows, setRows] = useState(datos);

  const setDataUpdateSucursalHandler = (sucursal) => {
    setRows(sucursal);
  };
  const dataUpdate = rows;

  const updateSucursalHandler = (sucursal) => {
    const lastSucursals = sucursals.map((data) =>
      data.id === sucursal.id
        ? {
            ...data,
            id: sucursal.id,
            nombre: sucursal.nombre,
            nombre_admin: sucursal.nombre_admin,
            telefono: sucursal.telefono,
            direccion: sucursal.direccion,
            fax: sucursal.fax,
            cantidad_pedidos: sucursal.cantidad_pedidos,
          }
        : data
    );
    setSucursals(lastSucursals);
    setRows(datos);
  };

  async function deleteRowHandler(sucursal) {
    const response = await fetch(
      "http://127.0.0.1:8000/api/sucursal/" + sucursal.id,
      {
        method: "delete",
      }
    );

    const data = await response.json();
    if (data.respuesta !== "success") {
      Alert("warning", data.mensaje);
    } else {
      const lastSucursals = sucursals.filter((data) => data.id !== sucursal.id);
      setSucursals(lastSucursals);
      Alert("success", data.mensaje);
    }
  }

  const confirmDeleteHandler = (sucursal) => {
    Swal.fire({
      title: "¿Esta seguro que desea eliminar el registro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      cancelButtonText: "NO",
      confirmButtonText: "SI",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRowHandler(sucursal);
      }
    });
  };

  const [modalIsShown, setModalIsShown] = useState(false);

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
    setRows("");
  };

  return (
    <SucursalProvider value={dataUpdate}>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="row">
            <div className="col-md-8">
              <h1 className="display-5">Lista de Sucursales</h1>
            </div>
            <div className="col-md-4 text-center">
              <Button
                type="button"
                class="btn btn-primary btn-lg"
                onClick={showModalHandler}
              >
                Nuevo
              </Button>
            </div>
            {modalIsShown && (
              <SucursalForm
                title="Agregar sucursal"
                onAddSucursal={addSucursalHandler}
                onUpdateSucursal={updateSucursalHandler}
                onClose={hideModalHandler}
              />
            )}
          </div>
          <Table
            name="Nombre"
            admin="Administrador"
            dir="Dirección"
            tel="Teléfono"
            actions="Acciones"
            pedidos="Cant. Pedidos"
            items={sucursals}
            openModal={showModalHandler}
            onUpdateRow={setDataUpdateSucursalHandler}
            onDeleteRow={confirmDeleteHandler}
            itemsPerPage={10}
          />
          <ToastContainer />
        </div>
      </div>
    </SucursalProvider>
  );
}
export default App;
