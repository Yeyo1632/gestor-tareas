const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const tareasRoutes = require("./routes/tareasRoutes");

app.use("/api/tareas", tareasRoutes);

// Ruta principal
app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

// Iniciar servidor PRIMERO
app.listen(5000, () => {
    console.log("🚀 Servidor ejecutándose en puerto 5000");
});

// Luego conectar MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => {
    console.log("✅ MongoDB conectado");
})

.catch((error) => {
    console.log("❌ Error MongoDB:");
    console.log(error);
});