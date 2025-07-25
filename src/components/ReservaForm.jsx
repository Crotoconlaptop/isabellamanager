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
      await crearReserva({
        ...form,
        cantidad: parseInt(form.cantidad, 10),
      });
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
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <label>
        Fecha
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          placeholder="Seleccionar fecha"
          required
        />
      </label>

      <label>
        Hora
        <input
          type="time"
          name="hora"
          value={form.hora}
          onChange={handleChange}
          placeholder="Seleccionar hora"
          required
        />
      </label>

      <label>
        Nombre
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
      </label>

      <label>
        Teléfono
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          required
        />
      </label>

      <label>
        Cantidad de personas
        <input
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={handleChange}
          placeholder="Cantidad de personas"
          required
        />
      </label>

      <label>
        Tomado por
        <input
          name="tomadoPor"
          value={form.tomadoPor}
          onChange={handleChange}
          placeholder="Tomado por"
        />
      </label>

      <label>
        Observaciones
        <input
          name="observaciones"
          value={form.observaciones}
          onChange={handleChange}
          placeholder="Observaciones"
        />
      </label>

      <button type="submit" style={{ padding: "10px", fontWeight: "bold" }}>
        Crear Reserva
      </button>
    </form>
  );
}

export default ReservaForm;
