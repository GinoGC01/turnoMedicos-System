import Turno from "../models/turnos.js";
import Profesional from "../models/professionals.js";
import {calculateMinDuration} from './calculateMinDurationSvProfesional.js'

export const checkAvailabilitySlot = async (turnoId, servicioId)=>{
    try {
        let availabilitySlot = 'available' // disponibilidad del turno
        // Obtener el turno inicial
        const initialTurno = await Turno.findById(turnoId);
        if (!initialTurno || initialTurno.status !== 'available') {
        return { message: "Turno no disponible", status: false };
        }

        // Obtener el profesional y el servicio
        const profesional = await Profesional.findById(initialTurno.profesionalId).populate("services");
        const service = profesional.services.find((s) => s.id === servicioId);

        if (!service) {
        return { message: "Servicio no encontrado", status: false };
        }

        // Calcular cuántos slots base se necesitan
        const baseSlotDuration = calculateMinDuration(profesional) // Duración de cada slot base en minutos
        const serviceDuration = service.duration //duracion del servicio en minutos
        const slotsNeeded = Math.ceil(serviceDuration / baseSlotDuration);

        // Obtener los slots base consecutivos necesarios
        const slotsToBook = await Turno.find({
        profesionalId: initialTurno.profesionalId,
        date: initialTurno.date,
        startTime: { $gte: initialTurno.startTime },
        status: "available",
        })
        .sort({ startTime: 1 })
        .limit(slotsNeeded);

        // Verificar que los slots sean consecutivos y estén en el mismo día
        let isConsecutive = true;
        for (let i = 0; i < slotsToBook.length - 1; i++) {
            const currentSlot = slotsToBook[i];
            const nextSlot = slotsToBook[i + 1];

            // Verificar que el endTime del slot actual coincida con el startTime del siguiente
            if (currentSlot.endTime !== nextSlot.startTime) {
                isConsecutive = false;
                break;
            }
        }

        if (!isConsecutive || slotsToBook.length < slotsNeeded) {
        availabilitySlot = 'not available'
        return { message: "No hay suficientes turnos disponibles", status: false, availabilitySlot };
        }

        const dataSlot = {
            initialTurno,
            profesional,
            slotsToBook,
            availabilitySlot
        }
        return dataSlot
    } catch (error) {
        console.error(error)
    }
}