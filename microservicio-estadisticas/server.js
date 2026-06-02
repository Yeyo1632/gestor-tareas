const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB conectado");
})
.catch(err => {
  console.log(err);
});

const TareaSchema = new mongoose.Schema({
  texto: String,
  completada: Boolean,
  prioridad: String
});

const Tarea = mongoose.model(
  "Tarea",
  TareaSchema,
  "tareas"
);

app.get("/estadisticas", async (req, res) => {

  const total = await Tarea.countDocuments();

  const completadas =
    await Tarea.countDocuments({
      completada: true
    });

  const pendientes =
    total - completadas;

  res.json({
    total,
    completadas,
    pendientes
  });

});

app.listen(process.env.PORT, () => {
  console.log(
    `Microservicio ejecutándose en puerto ${process.env.PORT}`
  );
});