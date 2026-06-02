const Tarea = require("../models/Tarea");

// Obtener todas las tareas
const obtenerTareas = async (req, res) => {

    try {

        const tareas = await Tarea.find();

        res.json(tareas);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Crear tarea
const crearTarea = async (req, res) => {

    try {

        const nuevaTarea = new Tarea({
            texto: req.body.texto,
            prioridad: req.body.prioridad
        });

        const tareaGuardada = await nuevaTarea.save();

        // Enviar notificación en tiempo real
        const io = req.app.get("io");

        io.emit("nuevaTarea", {
            mensaje: `Nueva tarea agregada: ${tareaGuardada.texto}`
        });

        res.status(201).json(tareaGuardada);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Eliminar tarea
const eliminarTarea = async (req, res) => {

    try {

        await Tarea.findByIdAndDelete(
            req.params.id
        );

        res.json({
            mensaje: "Tarea eliminada"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};
// Completar tarea
const completarTarea = async (req, res) => {

    try {

        const tarea = await Tarea.findById(req.params.id);

        tarea.completada = !tarea.completada;

        await tarea.save();

        res.json(tarea);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    obtenerTareas,
    crearTarea,
    eliminarTarea,
    completarTarea
};
