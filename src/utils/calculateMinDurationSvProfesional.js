export const calculateMinDuration = (profesional) =>{
    const services = profesional.services
  // Extraer las duraciones de los servicios
  const durations = services.map((service) => service.duration);
  // Encontrar la duración mínima
  const minDuration = Math.min(...durations);

  return minDuration;
}