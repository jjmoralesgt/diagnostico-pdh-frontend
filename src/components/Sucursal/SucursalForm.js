import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";

const SucursalForm = (props) => {
  return (
    <Modal>
      <form>
        <Input 
            label='Nombre de Sucursal' 
            input={{
                id:'sucursal',
                type:'text'                
            }}
        />
        <Input 
            label='Nombre de administrador'
            input={{
                id:'admin',
                type:'text'
            }}
        />
        <Input 
            label='Teléfono'
            input={{
                id:'tel',
                type:'text'
            }}
        />
        <Input 
            label='Dirección'
            input={{
                id:'direccion',
                type:'textarea'
            }}
        />
        <Input 
            label='Fax'
            input={{
                id:'fax',
                type:'text'
            }}
        />
        <Input 
            label='Cantidad de pedidos'
            input={{
                id:'pedidos',
                type:'number',
                min: '1',               
                step: '1',
                defaultValue: '0'
            }}
        />
        <Button type="submit" class="btn btn-primary">Guardar</Button>
      </form>
    </Modal>
  );
};

export default SucursalForm;
