const Usuario = require('../models/UsuarioModel');


// Metodo Read: Listar usuarios (activos)
exports.listarUsuarios = (req, res) => {
    Usuario.listarUsuarios((err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error al listar los usuarios", error: err });
        }

        res.status(200).json(results);
    });
};


//Metodo Insert
exports.insertarUsuario = (req, res) => {
    const usuarioData = req.body;

    Usuario.insertarUsuario(usuarioData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al registrar el usuario", error: err });
        }

        res.status(200).json({ message: "Usuario registrado" });
    });
};



//Metodo Update
exports.actualizarUsuario = (req, res) => {
    const usuarioData = req.body;
    const id = req.params.id;

    Usuario.actualizarUsuario(id, usuarioData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al actualizar el usuario", error: err });
        }
        res.status(200).json({ message: "Usuario actualizado" });
    });
};


// Cambiar estado del usuario, metodo DELETE
exports.cambiarEstadoUsuario = (req, res) => {
    const { id, estado } = req.body;

    Usuario.cambiarEstadoUsuario(id, estado, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al cambiar estado del usuario", error: err });
        }

        res.status(200).json({ message: "Estado del usuario actualizado" });
    });
};

const db = require('../database/conexion');

exports.obtenerTecnicos = (req, res) => {
  const query = `
    SELECT id_usuario, CONCAT(nombre, ' ', apellido) AS nombre_completo 
    FROM usuario 
    WHERE id_rol = 3 AND estado = 'activo'
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener técnicos:', err);
      res.status(500).json({ error: 'Error al obtener técnicos' });
    } else {
      res.json(results);
    }
  });
};