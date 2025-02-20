export const findAvailableSlotsByMonthYear = (professionalId, month, year) =>{
  const monthData = parseInt(month, 10) - 1;
  const yearData = parseInt(year, 10);
  
  // Crear fecha de inicio del mes (primer día a las 00:00:00 hora local)
  const startDateOfSlots = new Date(yearData, monthData, 1);
  startDateOfSlots.setHours(0, 0, 0, 0); // Asegura que sea a medianoche (hora local)

  // Crear fecha de fin del mes (último día a las 23:59:59 hora local)
  const endOfSlots = new Date(yearData, monthData + 1, 0);
  endOfSlots.setHours(23, 59, 59, 999); // Asegura que sea el último minuto del mes


  // Buscar los turnos que no están reservados en el rango de fechas
   const turno = {
    isBooked: false,
    profesionalId: professionalId,
    date: { $gte: startDateOfSlots, $lte: endOfSlots }
  };

  return turno
}