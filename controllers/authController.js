const Usuario = require('../models/UsuarioModel');


const login = (req, res) => {
    Usuario.loginUsuario(req.body.email, req.body.password, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error en la consulta", error: err });
        }
        if (data.length > 0) {
            req.session.user = {
                id_usuario: data[0].id_usuario, // 👈 esto era lo que faltaba
                nombre: data[0].nombre,
                apellido: data[0].apellido,
                rol: data[0].nombre_rol
            };
            console.log('Usuario autenticado', { user: req.session.user });
            return res.status(200).json({ message: "Success" });
        } else {
            return res.status(401).json({ message: "Fail" });
        }
    });
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error al cerrar sesión" });
        }
        res.clearCookie('connect.sid');
        console.log("Sesión cerrada con éxito");
        return res.status(200).json({ message: "Sesión cerrada con éxito" });
    });
};

const getUser = (req, res) => {
    if (req.session.user) {
        return res.status(200).json({
            success: true,
            message: "Inicio de sesión exitoso",
            user: req.session.user
        });
    } else {
        return res.status(200).json({
            success: false,
            message: "No hay sesión activa"
        });
    }
};

module.exports = { login, logout, getUser };