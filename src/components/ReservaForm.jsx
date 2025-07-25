import { useState } from "react";
import { crearReserva } from "../services/api";
import "../App.css"; // o "styles.css" según dónde tengas el CSS principal

function ReservaForm() {
  const hoy = new Date().toISOString().split("T")[0];
  const horaActual = new Date().toTimeString().split(":").slice(0, 2).join(":");

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    fecha: hoy,
    hora: horaActual,
    cantidad: 1,
    tomadoPor: "",
    observaciones: "",
  });

  const [estado, setEstado] = useState({ enviando: false, mensaje: null });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEstado({ enviando: true, mensaje: null });

    try {
      const cantidad = parseInt(form.cantidad);
      if (isNaN(cantidad) || cantidad <= 0) {
        throw new Error("Cantidad inválida");
      }

      await crearReserva({ ...form, cantidad });
      setEstado({ enviando: false, mensaje: "✅ Reserva creada con éxito" });
      setForm({
        nombre: "",
        telefono: "",
        fecha: hoy,
        hora: horaActual,
        cantidad: 1,
        tomadoPor: "",
        observaciones: "",
      });
    } catch (err) {
      setEstado({ enviando: false, mensaje: "❌ " + err.message });
    }
  }

  return (
    <div className="reserva-form-container">
      <h2>Crear Reserva</h2>
      <form className="reserva-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
        </label>
        <label>
          Teléfono:
          <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} required />
        </label>
        <label>
          Fecha:
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
        </label>
        <label>
          Hora:
          <input type="time" name="hora" value={form.hora} onChange={handleChange} required />
        </label>
        <label>
          Cantidad de personas:
          <input type="number" name="cantidad" value={form.cantidad} min="1" onChange={handleChange} required />
        </label>
        <label>
          Tomado por:
          <input type="text" name="tomadoPor" value={form.tomadoPor} onChange={handleChange} />
        </label>
        <label>
          Observaciones:
          <textarea name="observaciones" value={form.observaciones} onChange={handleChange} />
        </label>
        <button type="submit" disabled={estado.enviando}>
          {estado.enviando ? "Enviando..." : "Crear reserva"}
        </button>
        {estado.mensaje && <p className="estado">{estado.mensaje}</p>}
      </form>
    </div>
  );
}

export default ReservaForm;
