import { useState } from "react";
import { crearReserva } from "../services/api";
import "./App.css"; // O cambia por el que uses como principal

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
    <form className="reserva-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Nueva Reserva</h2>

      <input
        type="date"
        name="fecha"
        value={form.fecha}
        onChange={handleChange}
        placeholder="Fecha"
        className="form-input"
        required
      />
      <input
        type="time"
        name="hora"
        value={form.hora}
        onChange={handleChange}
        placeholder="Hora"
        className="form-input"
        required
      />
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre del cliente"
        className="form-input"
        required
      />
      <input
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        className="form-input"
        required
      />
      <input
        type="number"
        name="cantidad"
        value={form.cantidad}
        onChange={handleChange}
        placeholder="Cantidad de personas"
        className="form-input"
        required
      />
      <input
        name="tomadoPor"
        value={form.tomadoPor}
        onChange={handleChange}
        placeholder="Tomado por"
        className="form-input"
      />
      <textarea
        name="observaciones"
        value={form.observaciones}
        onChange={handleChange}
        placeholder="Observaciones"
        className="form-input"
        rows="3"
      />
      <button type="submit" className="form-button">Crear Reserva</button>
    </form>
  );
}

export default ReservaForm;
