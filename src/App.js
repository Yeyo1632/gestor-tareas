import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [tarea, setTarea] = useState("");
  const [lista, setLista] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);

  // Sugerencias inteligentes
  const tareasSugeridas = [
    "Hacer tarea de programación",
    "Estudiar React",
    "Comprar café",
    "Hacer ejercicio",
    "Terminar proyecto",
    "Leer documentación",
    "Preparar exposición",
    "Urgente terminar backend"
  ];

  // Obtener tareas
  const obtenerTareas = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/tareas"
      );

      setLista(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    obtenerTareas();

  }, []);

  // Autocompletado
  useEffect(() => {

    if (tarea.length > 0) {

      const filtradas = tareasSugeridas.filter((t) =>
        t.toLowerCase().includes(tarea.toLowerCase())
      );

      setSugerencias(filtradas);

    } else {

      setSugerencias([]);

    }

  }, [tarea]);

  // Agregar tarea
  const agregarTarea = async () => {

    // Validación avanzada
    if (tarea.trim() === "") {

      setMensaje("⚠ Debes escribir una tarea");

      return;
    }

    if (tarea.length < 3) {

      setMensaje("⚠ La tarea es demasiado corta");

      return;
    }

    try {

      const nuevaTarea = {

        texto: tarea,

        prioridad:
          tarea.toLowerCase().includes("urgente")
            ? "alta"
            : "normal"

      };

      const res = await axios.post(
        "http://localhost:5000/api/tareas",
        nuevaTarea
      );

      setLista([...lista, res.data]);

      setMensaje("✅ Tarea agregada");

      setTimeout(() => {
        setMensaje("");
      }, 2000);

      setTarea("");
      setSugerencias([]);

    } catch (error) {

      console.log(error);

    }

  };

  // Completar tarea
  const completarTarea = async (id) => {

    try {

      const res = await axios.put(
        `http://localhost:5000/api/tareas/${id}`
      );

      const nuevaLista = lista.map((t) => {

        if (t._id === id) {
          return res.data;
        }

        return t;

      });

      setLista(nuevaLista);

    } catch (error) {

      console.log(error);

    }

  };

  // Eliminar tarea
  const eliminarTarea = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/tareas/${id}`
      );

      const nuevaLista = lista.filter(
        (t) => t._id !== id
      );

      setLista(nuevaLista);

    } catch (error) {

      console.log(error);

    }

  };

  // Filtrar tareas
  const tareasFiltradas = lista.filter((t) =>
    t.texto.toLowerCase().includes(
      busqueda.toLowerCase()
    )
  );

  return (

    <div className="contenedor">

      <h1>📋 Gestor de Tareas</h1>

<p className="fecha">
  📅 Fecha: {new Date().toLocaleDateString()}
</p>

<p className="contador">
  Total de tareas: {lista.length}
</p>

      {/* Buscador */}
      <input
        type="text"
        placeholder="🔍 Buscar tarea..."
        value={busqueda}
        onChange={(e) =>
          setBusqueda(e.target.value)
        }
        className="busqueda"
      />

      <div className="input-container">

        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={tarea}
          onChange={(e) =>
            setTarea(e.target.value)
          }

          // Evento Enter
          onKeyDown={(e) => {

            if (e.key === "Enter") {
              agregarTarea();
            }

          }}
        />

        <button onClick={agregarTarea}>
          Agregar
        </button>

      </div>

      {/* Sugerencias */}
      {sugerencias.length > 0 && (

        <div className="sugerencias">

          {sugerencias.map((s, index) => (

            <p
              key={index}
              onClick={() => {

                setTarea(s);
                setSugerencias([]);

              }}
            >
              {s}
            </p>

          ))}

        </div>

      )}

      {/* Mensaje dinámico */}
      {mensaje && (
        <p className="mensaje">
          {mensaje}
        </p>
      )}

      <ul>

        {tareasFiltradas.map((t) => (

          <li
            key={t._id}
            className={`
              ${t.completada ? "completada" : ""}
              ${t.prioridad === "alta"
                ? "alta"
                : ""}
            `}
          >

            <span>
              {t.texto}
            </span>

            <div>

              <button
                onClick={() =>
                  completarTarea(t._id)
                }
              >
                ✅
              </button>

              <button
                onClick={() =>
                  eliminarTarea(t._id)
                }
              >
                ❌
              </button>

            </div>

          </li>

        ))}

      </ul>

    </div>

  );

}

export default App;