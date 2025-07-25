import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xswvbcgaxtgcedxwxzcg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzd3ZiY2dheHRnY2VkeHd4emNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTY5MzYsImV4cCI6MjA2OTAzMjkzNn0.mbeOJKcaww8eNzXzN1w5INi1A5y2VCC-cXKNLHu4jB8'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function crearReserva(reserva) {
  const { data, error } = await supabase.from('reservas').insert([reserva])
  if (error) throw error
  return data
}

export async function exportarReservas(desde, hasta) {
  const { data, error } = await supabase
    .from('reservas')
    .select('*')
    .gte('fecha', desde)
    .lte('fecha', hasta)
    .order('fecha', { ascending: true })
    .order('hora', { ascending: true })
  if (error) throw error
  return data
}
