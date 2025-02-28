import React, { useState, useEffect } from 'react';
import ListaEmpleados from './components/ListaEmpleados';
import FormularioEmpleado from './components/FormularioEmpleado';
import { obtenerEmpleados, crearEmpleado, actualizarEmpleado, eliminarEmpleado } from './services/empleadosService';

function App() {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
        const empleadosData = await obtenerEmpleados();
        setEmpleados(empleadosData);
    } catch (error) {
        console.error("Error al obtener empleados:", error);
    }
};


  const agregarEmpleado = async (empleado) => {
    await crearEmpleado(empleado);
    cargarEmpleados();
  };

  const editarEmpleado = (empleado) => {
    console.log("Editando empleado:", empleado);
    setEmpleadoSeleccionado(empleado);  
  };

  const actualizarEmpleadoSeleccionado = async (empleado) => {
    if (!empleadoSeleccionado) return;

    await actualizarEmpleado({ ...empleado, id: empleadoSeleccionado.id });
    cargarEmpleados();
    setEmpleadoSeleccionado(null); 
};



  const eliminarEmpleadoSeleccionado = async (id) => {
    await eliminarEmpleado(id);
    cargarEmpleados();
  };

  return (
    <>
      
      <div className='container-fluid mt-5'>
      <h1 className="text-center mb-2">Gestión de Empleados</h1>
      <div className='d-flex justify-content-center mx-auto gap-3'>
        <img src="\src\image\icons8-nodejs-96.png" alt="" />
        <img src="\src\image\icons8-mysql-96 (1).png" alt="" />
        <img className='react' src="\src\image\icons8-react-96.png" alt="" />
      </div>
        <div className=" d-flex flex-column align-items-center vh-100 justify-content-center mt-4">

          <div className='from1' >
            <FormularioEmpleado
              empleadoInicial={empleadoSeleccionado}
              onSubmit={empleadoSeleccionado ? actualizarEmpleadoSeleccionado : agregarEmpleado}
            />
          </div>
          <div className="w-75" style={{ maxWidth: '800px' }}>
            <ListaEmpleados empleados={empleados} onEditar={editarEmpleado} onEliminar={eliminarEmpleadoSeleccionado} />
          </div>
        </div>

      </div>


    </>

  );
}

export default App;
