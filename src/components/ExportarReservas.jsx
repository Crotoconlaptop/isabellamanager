import { useState } from "react";
import { exportarReservas } from "../services/api";

function ExportarReservas() {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  async function handleExportar() {
    if (!desde || !hasta) {
      alert("Elegí un rango válido");
      return;
    }
    try {
      await exportarReservas(desde, hasta);
    } catch (err) {
      alert("Error al exportar");
    }
  }

  return (
    <div>
      <input type="date" value={desde} onChange={e => setDesde(e.target.value)} />
      <input type="date" value={hasta} onChange={e => setHasta(e.target.value)} />
      <button onClick={handleExportar}>Exportar Excel</button>
    </div>
  );
}

export default ExportarReservas;
