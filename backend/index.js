const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());

app.use(express.json());

// conexión base de datos
const bd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbempleados',
});

// consulta empleados
app.get("/empleados", (req, res) => {
    bd.query("SELECT * FROM empleados", (error, resultado) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error en la consulta a la base de datos');
        } else {
            res.send(resultado);
        }
    });
});

// Resgistrar empleado
app.post("/crear",(req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const salario = req.body.salario;

    bd.query("INSERT INTO empleados(nombre, edad, pais, cargo, salario) VALUES(?,?,?,?,?)", 
        [nombre, edad, pais, cargo, salario],(error, resultado) =>{
            if (error) {
                console.log(error);
                res.status(500).send('Error en la consulta a la base de datos');
            } else {
                res.send(resultado);
            }
        }

    );
});

// Actualizar empleado 
app.put("/actualizarempleado", (req, res) => {
    const { id, nombre, edad, pais, cargo, salario } = req.body;

    if (!id) {
        return res.status(400).json({ error: "ID del empleado es requerido" });
    }

    bd.query(
        "UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, salario=? WHERE id=?",
        [nombre, edad, pais, cargo, salario, id],
        (error, resultado) => {
            if (error) {
                console.log(error);
                res.status(500).send("Error en la actualización del empleado");
            } else {
                res.status(200).json({ mensaje: "Empleado actualizado con éxito" });
            }
        }
    );
});


//Borrar empleado
app.delete("/borrarempleado/:id", (req, res) => {
    const id = req.params.id;

    bd.query("DELETE FROM empleados WHERE id=?", [id], (error, resultado) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error en la consulta a la base de datos');
        } else {
            res.status(200).json({ mensaje: "Empleado eliminado con éxito" });
        }
    });
});


// escuchar puerto
app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});