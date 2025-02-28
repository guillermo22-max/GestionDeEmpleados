import axios from 'axios';

const API_URL = 'http://localhost:3001'; // URL de tu backend

export const obtenerEmpleados = async () => {
    const respuesta = await axios.get(`${API_URL}/empleados`);
    return respuesta.data;
};

export const crearEmpleado = async (empleado) => {
    const respuesta = await axios.post(`${API_URL}/crear`, empleado);
    return respuesta.data;
};

export const actualizarEmpleado = async (empleado) => {
    try {
        const respuesta = await fetch("http://localhost:3001/actualizarempleado", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(empleado),
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo actualizar el empleado");
        }
        console.log("Empleado actualizado con éxito");
    } catch (error) {
        console.error("Error actualizando el empleado:", error);
    }
};


export const eliminarEmpleado = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3001/borrarempleado/${id}`, {
            method: "DELETE",
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo eliminar el empleado");
        }
        console.log("Empleado eliminado con éxito");
    } catch (error) {
        console.error("Error eliminando el empleado:", error);
    }
};
