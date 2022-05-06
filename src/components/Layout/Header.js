
import Button from "../UI/Button/Button";
import SucursalForm from "../Sucursal/SucursalForm";


const Header = (props) => {


  return (
    <div className="row">
      <div className="col-md-8">
        <h1 className="display-5">Lista de Sucursales</h1>
      </div>
      <div className="col-md-4 text-center">
        <Button type="button" class="btn btn-primary btn-lg">
          Nuevo
        </Button>
      </div>
      <SucursalForm />
    </div>
  );
}

export default Header;
