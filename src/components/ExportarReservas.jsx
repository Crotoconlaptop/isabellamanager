import { useState } from "react";
import { exportarReservas } from "../services/api";

function ExportarReservas() {
  const hoy = new Date();
  const unaSemanaDespues = new Date(hoy);
  unaSemanaDespues.setDate(hoy.getDate() + 7);

  const [desde, setDesde] = useState(hoy.toISOString().split("T")[0]);
  const [hasta, setHasta] = useState(unaSemanaDespues.toISOString().split("T")[0]);

  async function handleExportar() {
    try {
      await exportarReservas(desde, hasta);
    } catch (error) {
      alert("No se pudo exportar: " + error.message);
    }
  }

  return (
    <div className="exportar-container">
      <h2>Exportar reservas</h2>
      <div className="exportar-form">
        <label>
          Desde:
          <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
        </label>
        <label>
          Hasta:
          <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
        </label>
        <button onClick={handleExportar}>Descargar Excel</button>
      </div>
    </div>
  );
}

export default ExportarReservas;
