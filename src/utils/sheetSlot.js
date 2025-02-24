export const sheetSlot = (professional, slot, data)=>{

    const {nombre, dni} = data
    const especialista = professional.name
    const profesion = professional.profession
    const date = new Date(slot.date)
    const dia = String(date.getUTCDate()).padStart(2, '0');
    const mes = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mes (03)
    const año = date.getUTCFullYear();
    const fecha = `${dia}/${mes}/${año}`
    const hora = slot.startTime + " hs."

    const sheetSlotObject = {
      nombre, dni, especialista, profesion, fecha, hora
    }

    return sheetSlotObject
}