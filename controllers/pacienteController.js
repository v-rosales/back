const Paciente = require('../models/PacienteModel');
const db = require('../database/conexion');

// Metodo Read: Listar pacientes (activos)
exports.listarPacientesActivos = (req, res) => {
    Paciente.listarPacientesActivos((err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error al listar los pacientes", error: err });
        }

        res.status(200).json(results);
    });
};


//Metodo Insert
exports.insertarPaciente = (req, res) => {
    const pacienteData = req.body;

    Paciente.insertarPaciente(pacienteData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al registrar el paciente", error: err });
        }

        res.status(200).json({ message: "Paciente registrado" });
    });
};



//Metodo Update
exports.actualizarPaciente = (req, res) => {
    const pacienteData = req.body;
    const id = req.params.id;

    Paciente.actualizarPaciente(id, pacienteData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al actualizar el paciente", error: err });
        }
        res.status(200).json({ message: "Paciente actualizado" });
    });
};


// Cambiar estado de paciente, metodo DELETE
exports.cambiarEstadoPaciente = (req, res) => {
    const { id, estado } = req.body;

    Paciente.cambiarEstadoPaciente(id, estado, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al cambiar estado del paciente", error: err });
        }

        res.status(200).json({ message: "Estado del paciente actualizado" });
    });
};

// Búsqueda de pacientes por nombre o apellido
exports.buscarPacientes = (req, res) => {
  const q = req.query.q;
  const query = `
    SELECT id_paciente, nombre_paciente, apellido_paciente, dui_paciente
    FROM paciente
    WHERE estado = 'activo'
      AND (nombre_paciente LIKE ? OR apellido_paciente LIKE ?)
  `;
  db.query(query, [`%${q}%`, `%${q}%`], (err, results) => {
    if (err) {
      console.error('Error al buscar pacientes:', err);
      res.status(500).json({ error: 'Error al buscar pacientes' });
    } else {
      res.json(results);
    }
  });
};

exports.obtenerTodosLosPacientes = (req, res) => {
  const query = 'SELECT id_paciente, nombre_paciente, apellido_paciente, dui_paciente FROM paciente WHERE estado = "activo"';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener pacientes:', err);
      res.status(500).json({ error: 'Error al obtener pacientes' });
    } else {
      res.json(results);
    }
  });
};