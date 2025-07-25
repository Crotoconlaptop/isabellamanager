import { useState } from "react";
import "./App.css"; // o "styles.css" si preferís

function ExportarReservas() {
  const [desde, setDesde] = useState(() => {
    const hoy = new Date();
    return hoy.toISOString().split("T")[0]; // YYYY-MM-DD
  });

  const [hasta, setHasta] = useState(() => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 7); // una semana después
    return hoy.toISOString().split("T")[0];
  });

  async function handleExportar() {
    try {
      const response = await fetch(
        `https://<TU-PROYECTO>.supabase.co/functions/v1/exportar?desde=${desde}&hasta=${hasta}`
      );

      if (!response.ok) {
        throw new Error("Error al exportar reservas");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "reservas.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
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
