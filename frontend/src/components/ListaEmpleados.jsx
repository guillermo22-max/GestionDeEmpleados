import { useState } from 'react';

const ListaEmpleados = ({ empleados, onEditar, onEliminar }) => {
    const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null);

    const confirmarEliminacion = (empleado) => {
        if (window.confirm(`¿Seguro que quieres eliminar a ${empleado.nombre}?`)) {
            onEliminar(empleado.id);
            alert('Empleado eliminado exitosamente');
        }
    };

    return (
        <div>
            <h2 className='text-center'>Lista de Empleados</h2>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr className='text-center'>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>País</th>
                        <th>Cargo</th>
                        <th>Salario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado) => (
                        <tr key={empleado.id}>
                            <td>{empleado.nombre}</td>
                            <td>{empleado.edad}</td>
                            <td>{empleado.pais}</td>
                            <td>{empleado.cargo}</td>
                            <td>{empleado.salario}</td>
                            <td className='d-flex justify-content-center'>
                                <button
                                    className='btn btn-primary me-2'
                                    onClick={() => onEditar(empleado)}
                                >
                                    Editar
                                </button>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => confirmarEliminacion(empleado)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaEmpleados;