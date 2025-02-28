import { calculateMinDuration } from "./calculateMinDurationSvProfesional.js";


export const generateSlots = (profesional, month, year) => {
  const slots = [];
  const daysOn = profesional.availability.daysOn;
  const workingHours = profesional.availability.workingHours;
  const baseSlotDuration = calculateMinDuration(profesional) * 60
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
    if (daysOn.includes(day.toLocaleDateString("en-US", { weekday: "long" }))) {
      let startTime = new Date(day);
      startTime.setHours(
        workingHours.start.split(":")[0],
        workingHours.start.split(":")[1]
      );

      const endTime = new Date(day);
      endTime.setHours(
        workingHours.end.split(":")[0],
        workingHours.end.split(":")[1]
      );

      while (startTime < endTime) {
        const slotEndTime = new Date(startTime.getTime() + (baseSlotDuration * 60000));

        if (slotEndTime > endTime) {
          break;
        }

        slots.push({
          profesionalId: profesional._id,
          date: new Date(day),
          startTime: startTime.toTimeString().split(" ")[0],
          endTime: slotEndTime.toTimeString().split(" ")[0],
          status: "available",
          paymentAdvance: profesional.paymentAdvance,
        });

        startTime = new Date(slotEndTime);
      }
    }
  }

  return slots;
};
