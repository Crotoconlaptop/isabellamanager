// src/services/api.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xswvbcgaxtgcedxwxzcg.supabase.co'; // REEMPLAZAR
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzd3ZiY2dheHRnY2VkeHd4emNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTY5MzYsImV4cCI6MjA2OTAzMjkzNn0.mbeOJKcaww8eNzXzN1w5INi1A5y2VCC-cXKNLHu4jB8'; // REEMPLAZAR
const supabase = createClient(supabaseUrl, supabaseKey);

export async function crearReserva(data) {
  const { data: totalData, error: totalError } = await supabase
    .from('reservas')
    .select('cantidad')
    .eq('fecha', data.fecha)
    .eq('hora', data.hora);

  if (totalError) throw totalError;

  const total = totalData.reduce((acc, r) => acc + r.cantidad, 0);
  if (total + Number(data.cantidad) > 130) {
    throw new Error('Cupo superado para ese turno');
  }

  const { error } = await supabase.from('reservas').insert([data]);
  if (error) throw error;
}

export async function exportarReservas(desde, hasta) {
  const { data, error } = await supabase
    .from('reservas')
    .select('*')
    .gte('fecha', desde)
    .lte('fecha', hasta)
    .order('fecha', { ascending: true })
    .order('hora', { ascending: true });

  if (error) throw error;

  const csvRows = [
    ['Nombre', 'Teléfono', 'Fecha', 'Hora', 'Cantidad', 'Tomado por', 'Observaciones']
  ];

  data.forEach(r => {
    const fechaFormateada = new Date(`${r.fecha}T${r.hora}`).toLocaleString('es-AR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }).replace(',', ' –') + ' hs';
    csvRows.push([r.nombre, r.telefono, fechaFormateada, r.hora, r.cantidad, r.tomadoPor || '', r.observaciones || '']);
  });

  const csvContent = csvRows.map(e => e.join(',')).join('\n');
  return new Blob([csvContent], { type: 'text/csv' });
}
