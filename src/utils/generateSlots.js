import { calculateMinDuration } from "./calculateMinDurationSvProfesional.js";

export const generateSlots = (profesional, month, year) => {
  const slots = [];
  const daysOn = profesional.availability.daysOn; // Días que trabaja
  const defaultWorkingHours = profesional.availability.workingHours; // Horario completo por defecto
  const partialDays = profesional.availability.partialDays || []; // Horarios parciales (si existen)
  const baseSlotDuration = calculateMinDuration(profesional) // in minutes

  const startDate = new Date(year, month - 1, 1); // Primer día del mes
  const endDate = new Date(year, month, 0); // Último día del mes

  // Recorrer cada día del mes
  for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
    const dayOfWeek = day.toLocaleDateString("en-US", { weekday: "long" }); // Día de la semana (ej: "Monday")

    // Verificar si el profesional trabaja ese día
    if (daysOn.includes(dayOfWeek)) {
      // Obtener los bloques de horario para ese día (completo o parcial)
      const partialDay = partialDays.find((d) => d.day === dayOfWeek);
      const workingHoursBlocks = partialDay ? partialDay.workingHours : [defaultWorkingHours];

      // Recorrer cada bloque de horario
      for (const block of workingHoursBlocks) {
        let startTime = new Date(day);
        startTime.setHours(
          block.start.split(":")[0],
          block.start.split(":")[1]
        );

        const endTime = new Date(day);
        endTime.setHours(
          block.end.split(":")[0],
          block.end.split(":")[1]
        );

        // Generar slots base para ese bloque de horario
        while (startTime < endTime) {
          const slotEndTime = new Date(startTime.getTime() + baseSlotDuration * 60000);

          if (slotEndTime > endTime) {
            break; // Si el slot excede el horario de trabajo, no lo agregamos
          }

          slots.push({
            profesionalId: profesional._id,
            date: new Date(day),
            startTime: startTime.toTimeString().split(" ")[0], // Formato HH:MM:SS
            endTime: slotEndTime.toTimeString().split(" ")[0], // Formato HH:MM:SS,
            paymentAdvance: profesional.paymentAdvance,
            status: "available", // Estado inicial: disponible
          });

          startTime = new Date(slotEndTime); // Actualizar el startTime para el próximo slot
        }
      }
    }
  }

  return slots;
}; // horario de corrido
