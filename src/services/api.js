// src/services/api.js
import { createClient } from "@supabase/supabase-js";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

// Claves directamente incluidas (como pediste)
const supabaseUrl = "https://xswvbcgaxtgcedxwxzcg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzd3ZiY2dheHRnY2VkeHd4emNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTY5MzYsImV4cCI6MjA2OTAzMjkzNn0.mbeOJKcaww8eNzXzN1w5INi1A5y2VCC-cXKNLHu4jB8";

const supabase = createClient(supabaseUrl, supabaseKey);

// Crear reserva con validación de cupo
export async function crearReserva(data) {
  const { data: existentes, error: errorConsulta } = await supabase
    .from("reservas")
    .select("cantidad")
    .eq("fecha", data.fecha)
    .eq("hora", data.hora);

  if (errorConsulta) throw new Error("Error al consultar el total de reservas");

  const total = existentes?.reduce((acc, r) => acc + r.cantidad, 0) || 0;
  if (total + Number(data.cantidad) > 130) {
    throw new Error("Cupo superado para ese turno");
  }

  const { error } = await supabase.from("reservas").insert([data]);
  if (error) throw new Error("Error al crear la reserva");
}

// Exportar reservas a archivo Excel
export async function exportarReservas(desde, hasta) {
  const { data, error } = await supabase
    .from("reservas")
    .select("*")
    .gte("fecha", desde)
    .lte("fecha", hasta)
    .order("fecha", { ascending: true })
    .order("hora", { ascending: true });

  if (error) throw new Error("Error al obtener reservas");

  const formatted = data.map((r) => ({
    Fecha: r.fecha,
    Hora: r.hora,
    Nombre: r.nombre,
    Teléfono: r.telefono,
    Cantidad: r.cantidad,
    "Tomado por": r.tomadoPor || "",
    Observaciones: r.observaciones || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(formatted);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reservas");

  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  saveAs(blob, `reservas_${desde}_a_${hasta}.xlsx`);
}
