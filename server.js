const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path"); // <- Importante para rutas absolutas

const authRoutes = require("./routes/authRoutes");
const pacienteRoutes = require("./routes/pacienteRoutes");
const rolRoutes = require("./routes/rolRoutes");
const areaRoutes = require("./routes/areaRoutes");
const especialidadRoutes = require("./routes/especialidadRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const tipoConsultaRoutes = require("./routes/tipoConsultaRoutes");
const estadoConsultaRoutes = require("./routes/estadoConsultaRoutes");
const consultaRoutes = require("./routes/consultaRoutes");
const detalleConsultaRoutes = require("./routes/detalleConsultaRoutes");
const historialMedicoRoutes = require("./routes/historialMedicoRoutes");
const rayosxRoutes = require("./routes/rayosxRoutes");
const equiposRoutes = require("./routes/equiposRoutes");
const imagenesRayosxRoutes = require("./routes/imagenesRayosxRoutes");
const informesRayosxRoutes = require("./routes/informesRayosxRoutes");

const db = require('./database/conexion');

const app = express();
app.set('db', db);

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 día
    }
}));

// Rutas
app.use("/auth", authRoutes);
app.use("/pacientes", pacienteRoutes);
app.use("/roles", rolRoutes);
app.use("/areas", areaRoutes);
app.use("/especialidades", especialidadRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/tipos-consulta", tipoConsultaRoutes);
app.use("/estados-consulta", estadoConsultaRoutes);
app.use("/consultas", consultaRoutes);
app.use("/detalles-consultas", detalleConsultaRoutes);
app.use("/historiales-medicos", historialMedicoRoutes);
app.use("/api/rayosx", rayosxRoutes);
app.use("/equipos", equiposRoutes);
app.use("/api/imagenes-rayosx", imagenesRayosxRoutes);
app.use("/api/informes-rayosx", informesRayosxRoutes);

// ✅ Servir archivos estáticos de /public/uploads correctamente
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Iniciar servidor
app.listen(8081, () => {
    console.log("✅ Conexión exitosa en el puerto 8081");
});
