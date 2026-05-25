const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({

    texto: {
        type: String,
        required: true
    },

    completada: {
        type: Boolean,
        default: false
    },

    prioridad: {
        type: String,
        default: "normal"
    },

    fecha: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Tarea", tareaSchema);