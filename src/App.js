import { Fragment, useState, useEffect } from "react";
import useHttp from "./hooks/use-http";
import Button from "./components/UI/Button/Button";
import SucursalForm from "./components/Sucursal/SucursalForm";
import SucursalList from "./components/Sucursal/SucursalList";
import SucursalProvider from "./store/SucursalProvider";
import "bootstrap/dist/css/bootstrap.min.css";

function App(props) {

  
  const [sucursals, setSucursals] = useState([]);

  const { isLoading, error, sendRequest: fetchSucursals } = useHttp();

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

  const [rows, setRows] = useState();
  const addRowUpdateHandler = expense => {
    setRows(expense);  
  }
  

  const [modalIsShown, setModalIsShown] = useState(false);

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
    setRows('');
    console.log(rows);    
    
  };  

  const dataUpdate = rows;
  /*const sucursalAddHandler = (sucursal) => {
    setSucursals((prevSucursals) => prevSucursals.concat(sucursal));
  };*/

 
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
                onClose={hideModalHandler}                
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
            onUpdate={showModalHandler}
            onAddUpdateRow={addRowUpdateHandler}                    
          />
        </div>
      </div>
    </SucursalProvider>
  );
}
export default App;
