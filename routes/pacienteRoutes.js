const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); 
const pacienteController = require('../controllers/pacienteController');
const router = express.Router();


router.post('/registrar', authMiddleware, pacienteController.insertarPaciente);
router.get('/listar', authMiddleware, pacienteController.listarPacientesActivos);
router.patch('/cambiar-estado', pacienteController.cambiarEstadoPaciente); 
router.put('/actualizar/:id', authMiddleware, pacienteController.actualizarPaciente);
router.get('/buscar', pacienteController.buscarPacientes);
router.get('/', pacienteController.obtenerTodosLosPacientes);

module.exports = router;