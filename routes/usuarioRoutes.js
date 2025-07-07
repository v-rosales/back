const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); 
const usuarioController = require('../controllers/usuarioController');
const db = require('../database/conexion');
const router = express.Router();


router.post('/registrar', authMiddleware, usuarioController.insertarUsuario);
router.get('/listar', authMiddleware, usuarioController.listarUsuarios);
router.patch('/cambiar-estado', usuarioController.cambiarEstadoUsuario); 
router.put('/actualizar/:id', authMiddleware, usuarioController.actualizarUsuario);
router.get('/tecnicos', (req, res) => {
  db.query(
    `SELECT id_usuario, CONCAT(nombre, ' ', apellido) AS nombre_completo 
     FROM usuario 
     WHERE id_rol = 3`, // o el ID de rol de técnico
    (err, results) => {
      if (err) {
        console.error('Error al obtener técnicos:', err);
        return res.status(500).json({ error: 'Error al obtener técnicos' });
      }
      res.json(results);
    }
  );
});


module.exports = router;