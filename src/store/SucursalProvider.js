import SucursalContext from "./sucursal-context";

const SucursalProvider = (props) => {   
  
  const sucursalContext = props.value
    /*data
  }*/

  
  return (
    <SucursalContext.Provider value={sucursalContext}>
      {props.children}
    </SucursalContext.Provider>
  );
};

export default SucursalProvider;
