// src/components/ExportarReservas.jsx
import { useState } from "react";
import { exportarReservas } from "../services/api";

function ExportarReservas() {
  const [desde, setDesde] = useState(() => new Date().toISOString().slice(0, 10));
  const [hasta, setHasta] = useState(() => new Date().toISOString().slice(0, 10));

  async function handleExportar(e) {
    e.preventDefault();
    try {
      await exportarReservas(desde, hasta);
    } catch (err) {
      alert("Error exportando: " + err.message);
    }
  }

  return (
    <form onSubmit={handleExportar} className="exportar-form">
      <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} required />
      <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} required />
      <button type="submit">Exportar reservas</button>
    </form>
  );
}

export default ExportarReservas;
