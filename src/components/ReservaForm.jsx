import { useState } from "react";
import { crearReserva } from "../services/api";

function ReservaForm() {
  const [form, setForm] = useState({
    fecha: "",
    hora: "",
    nombre: "",
    telefono: "",
    cantidad: "",
    tomadoPor: "",
    observaciones: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await crearReserva(form);
      alert("Reserva creada con éxito");
      setForm({
        fecha: "",
        hora: "",
        nombre: "",
        telefono: "",
        cantidad: "",
        tomadoPor: "",
        observaciones: ""
      });
    } catch (err) {
      alert(err.message || "Error al crear reserva");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <label>Fecha</label>
      <input
        type="date"
        name="fecha"
        value={form.fecha}
        onChange={handleChange}
        required
      />

      <label>Hora</label>
      <input
        type="time"
        name="hora"
        value={form.hora}
        onChange={handleChange}
        required
      />

      <label>Nombre</label>
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />

      <label>Teléfono</label>
      <input
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        required
      />

      <label>Cantidad de personas</label>
      <input
        type="number"
        name="cantidad"
        value={form.cantidad}
        onChange={handleChange}
        placeholder="Cantidad de personas"
        required
      />

      <label>Tomado por</label>
      <input
        name="tomadoPor"
        value={form.tomadoPor}
        onChange={handleChange}
        placeholder="Tomado por"
      />

      <label>Observaciones</label>
      <input
        name="observaciones"
        value={form.observaciones}
        onChange={handleChange}
        placeholder="Observaciones"
      />

      <button type="submit">Crear Reserva</button>
    </form>
  );
}

export default ReservaForm;
