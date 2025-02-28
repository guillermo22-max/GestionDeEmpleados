import React, { useState, useEffect } from 'react';

const FormularioEmpleado = ({ empleadoInicial, onSubmit }) => {
    const [empleado, setEmpleado] = useState({
        nombre: "",
        edad: "",
        pais: "",
        cargo: "",
        salario: ""
    });

    useEffect(() => {
        if (empleadoInicial) {
            setEmpleado(empleadoInicial);
        }
    }, [empleadoInicial]);

    const handleChange = (e) => {
        setEmpleado({ ...empleado, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(empleado);
        setEmpleado({ nombre: "", edad: "", pais: "", cargo: "", salario: "" }); // Reset form
    };

    return (
        <form onSubmit={handleSubmit} className="form d-flex flex-column justify-content-center  p-4 border rounded shadow">
            <h3 className='text-center mb-4'>{empleadoInicial ? "Editar Empleado" : "Agregar Empleado"}</h3>

            
            <input 
                type="text"
                name="nombre" 
                value={empleado.nombre} 
                onChange={handleChange} required 
                placeholder='Nombre'
                className="form-control mb-2"
                />

            
            <input 
                type="number" 
                name="edad" 
                value={empleado.edad} 
                onChange={handleChange} required 
                placeholder='Edad'
                className="form-control mb-2"
            />

           
            <input 
                type="text" 
                name="pais" 
                value={empleado.pais} 
                onChange={handleChange} required
                className="form-control mb-2"
                placeholder='País'
                
            />

            
            <input 
                type="text" 
                name="cargo" 
                value={empleado.cargo} 
                onChange={handleChange} required
                className="form-control mb-2" 
                placeholder='Cargo'
            
            />

            
            <input 
                type="number" 
                name="salario" 
                value={empleado.salario} 
                onChange={handleChange} required
                className="form-control mb-4" 
                placeholder='Salario'
            
            />

            <button 
                type="submit" 
                className="btn btn-primary">
                {empleadoInicial ? "Actualizar" : "Agregar"}
            </button>
        </form>
    );
};

export default FormularioEmpleado;
