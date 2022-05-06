import React, { useState, useEffect } from "react";
import useHttp from "./hooks/use-http";
import Button from "./components/UI/Button/Button";
import SucursalForm from "./components/Sucursal/SucursalForm";
import SucursalList from "./components/Sucursal/SucursalList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [modalIsShown, setModalIsShown] = useState(false);

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  const [sucursals, setSucursals] = useState([]);

  const { isLoading, error, sendRequest: fetchSucursals } = useHttp();

  useEffect(() => {
    const transformSucursal = (sucursalObj) => {
      const loadedSucursals = [];

      for (const sucursalKey in sucursalObj) {
        loadedSucursals.push({
          id: sucursalKey,
          nombre: sucursalObj[sucursalKey].nombre,
          nombre_admin: sucursalObj[sucursalKey].nombre_admin,
        });
      }

      setSucursals(loadedSucursals);
    };
    fetchSucursals(
      { url: "http://127.0.0.1:8000/api/sucursal" },
      transformSucursal
    );
  }, [fetchSucursals]);

  /*const sucursalAddHandler = (sucursal) => {
    setSucursals((prevSucursals) => prevSucursals.concat(sucursal));
  };*/

  async function addSucursalHandler(sucursal) {

    //console.log(sucursal);

    const response = await fetch("http://127.0.0.1:8000/api/sucursal", {
      method: "POST",
      body: JSON.stringify(sucursal),
      headers: {
        "Content-Type": "application/json",        
      },
      
    });
    const data = await response.json();
    console.log(data);

    
  }

  return (
    <React.Fragment>
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
                onClose={hideModalHandler}
                onAddSucursal={addSucursalHandler}
                title="Agregar sucursal"
              />
            )}
          </div>
          <SucursalList
            name="Nombre"
            admin="Administrador"
            actions="Acciones"
            items={sucursals}
            loading={isLoading}
            error={error}
            onFetch={fetchSucursals}
            onEdit={showModalHandler}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
export default App;
