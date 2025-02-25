export const sheetSlot = (professional, slot, data)=>{

    const {nombre, dni, edad, payment_id, payment_description,    payment_payer_email, payment_payer_identification,
      payment_status, payment_status_detail, payment_transaction_amount,payment_net_received_amount,payment_total_paid_amount,
      payment_date_approved
     } = data
    const especialista = professional.name
    const profesion = professional.profession
    const date = new Date(slot.date)
    const dia = String(date.getUTCDate()).padStart(2, '0');
    const mes = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mes (03)
    const año = date.getUTCFullYear();
    const fecha = `${dia}/${mes}/${año}`
    const hora = slot.startTime + " hs."
    const paymentDateAproved = new Date(payment_date_approved)
    const payment_dia = String(paymentDateAproved.getUTCDate()).padStart(2, '0');
    const payment_mes = String(paymentDateAproved.getUTCMonth() + 1).padStart(2, '0'); // Mes (03)
    const payment_año = paymentDateAproved.getUTCFullYear();
    const payment_fecha = `${payment_dia}/${payment_mes}/${payment_año}`

    const sheetSlotObject = {
      nombre,
      dni,
      edad,
      especialista,
      profesion,
      fecha,
      hora,
      payment_id,
      payment_description,
      payment_payer_email,
      payment_payer_identification,
      payment_status,
      payment_status_detail,
      payment_transaction_amount,
      payment_net_received_amount,
      payment_total_paid_amount,
      payment_fecha
    }

    return sheetSlotObject
}