const API_URL = "http://62.146.229.231:3010";

export async function crearReserva(data) {
  const res = await fetch(`${API_URL}/reservas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al crear reserva");
  }

  return await res.json();
}

export async function exportarReservas(desde, hasta) {
  const res = await fetch(`${API_URL}/exportar?desde=${desde}&hasta=${hasta}`);
  if (!res.ok) throw new Error("Error al exportar");
  const blob = await res.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `reservas-${desde}_a_${hasta}.xlsx`;
  a.click();
  window.URL.revokeObjectURL(url);
}
