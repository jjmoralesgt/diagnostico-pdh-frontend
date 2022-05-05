import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import useHttp from '../../hooks/use-http';
import SucursalList from '../Sucursal/SucursalList';

const Main = () => {

    const [sucursals, setSucursals] = useState([]);

    const { isLoading, error, sendRequest: fetchSucursals } = useHttp();


    useEffect(() => {
        const transformSucursal = sucursalObj => {
            const loadedSucursals = [];

            for (const sucursalKey in sucursalObj) {
                loadedSucursals.push({ id: sucursalKey, nombre: sucursalObj[sucursalKey].nombre, nombre_admin: sucursalObj[sucursalKey].nombre_admin });
            }

            setSucursals(loadedSucursals);
        };
        fetchSucursals(
            { url: 'http://127.0.0.1:8000/api/sucursal' },
            transformSucursal
        );
    }, [fetchSucursals]);

    const sucursalAddHandler = (sucursal) => {
        setSucursals((prevSucursals) => prevSucursals.concat(sucursal));
    };
    return (
        <Row className="justify-content-md-center">

            <SucursalList
                name="Nombre"
                admin="Administrador"
                actions="Acciones"
                items={sucursals}
                loading={isLoading}
                error={error}
                onFetch={fetchSucursals}
            />
        </Row>
    );
}

export default Main;