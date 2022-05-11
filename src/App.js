import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useHttp from "./hooks/use-http";
import SucursalProvider from "./store/SucursalProvider";
import Button from "./components/UI/Button/Button";
import SucursalForm from "./components/Sucursal/SucursalForm";
import SucursalList from "./components/Sucursal/SucursalList";
import Swal from "sweetalert2";
import Alert from "./components/UI/Alert/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

function App(props) {
  const [sucursals, setSucursals] = useState([]);

  const { sendRequest: fetchSucursals } = useHttp();

  useEffect(() => {
    const transformSucursal = (sucursalObj) => {
      const loadedSucursals = [];

      for (const sucursalKey in sucursalObj) {
        loadedSucursals.push({
          id: sucursalObj[sucursalKey].id,
          nombre: sucursalObj[sucursalKey].nombre,
          nombre_admin: sucursalObj[sucursalKey].nombre_admin,
          telefono: sucursalObj[sucursalKey].telefono,
          direccion: sucursalObj[sucursalKey].direccion,
          fax: sucursalObj[sucursalKey].fax,
          cantidad_pedidos: sucursalObj[sucursalKey].cantidad_pedidos,
        });
      }

      setSucursals(loadedSucursals);
    };
    fetchSucursals(
      { url: "http://127.0.0.1:8000/api/sucursal" },
      transformSucursal
    );
  }, [fetchSucursals]);

  const datos = {
    id: "",
    nombre: "",
    nombre_admin: "",
    telefono: "",
    direccion: "",
    fax: "",
    cantidad_pedidos: ""
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
    const lastSucursals = sucursals.filter((data) => data.id !== sucursal.id);  
    setSucursals(lastSucursals);
    setSucursals((prevSucursals) => {
      return [sucursal, ...prevSucursals];
    })
  }

  async function deleteRowHandler(sucursal) {
    const response = await fetch("http://127.0.0.1:8000/api/sucursal/" + sucursal.id, {
      method: "delete",
    });

    const data = await response.json();
    if(data.respuesta !== "success"){
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
          <SucursalList
            name="Nombre"
            admin="Administrador"
            dir="Dirección"
            tel="Teléfono"
            actions="Acciones"
            pedidos="Cant. Pedidos"
            items={sucursals}
            onFetch={fetchSucursals}
            openModal={showModalHandler}
            onUpdateRow={setDataUpdateSucursalHandler}
            onDeleteRow={confirmDeleteHandler}
          />
          <ToastContainer />
        </div>
      </div>
    </SucursalProvider>
  );
}
export default App;
