const express = require("express");

const router = express.Router();

const {
    obtenerTareas,
    crearTarea,
    eliminarTarea,
    completarTarea
} = require("../controllers/tareasController");

// Obtener tareas
router.get("/", obtenerTareas);

// Crear tarea
router.post("/", crearTarea);

// Eliminar tarea
router.delete("/:id", eliminarTarea);

// Completar tarea
router.put("/:id", completarTarea);

module.exports = router;