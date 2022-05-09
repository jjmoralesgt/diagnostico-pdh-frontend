import React from 'react';

const SucursalContext = React.createContext({
    id: '',
    nombre: '',
    nombre_admin: '',
    telefono: '',
    direccion: '',
    fax: '',
    cantidad_pedidos: ''
})

export default SucursalContext;