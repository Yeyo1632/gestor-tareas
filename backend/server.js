const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Crear servidor HTTP
const server = http.createServer(app);

// Crear Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Hacer io accesible desde las rutas/controladores
app.set("io", io);

io.on("connection", (socket) => {
    console.log("🔌 Usuario conectado");

    socket.on("disconnect", () => {
        console.log("❌ Usuario desconectado");
    });
});

// Rutas
const tareasRoutes = require("./routes/tareasRoutes");
app.use("/api/tareas", tareasRoutes);

// Ruta principal
app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

// Iniciar servidor
server.listen(5000, () => {
    console.log("🚀 Servidor ejecutándose en puerto 5000");
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB conectado");
})
.catch((error) => {
    console.log("❌ Error MongoDB:");
    console.log(error);
});