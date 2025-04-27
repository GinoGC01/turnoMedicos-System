import { checkUserExistAndSave } from '../verifications/checkUserExist.js'
import { saveTurnoAndWritingSheet } from '../saveTurnoandWritingSheets.js'
import { sendEmailSavedSlot } from '../emails/SendEmailSavedSlot.js'

export const webhookPayment = async (payment, id, externalData) => {
  try {
    // Consulta el estado del pago
    const paymentDetails = await payment.get({ id })

    if (paymentDetails.status !== 'approved') return { status: 400, json: { error: 'pago no aprobado' } }

    const data = {
      nombre: externalData.nombre,
      dni: externalData.dni,
      edad: externalData.edad,
      email: externalData.email,
      telefono: externalData.telefono,
      profesionalId: externalData.profesionalId,
      turnoId: externalData.turno._id,
      servicioId: externalData.service.id,
      fechaTurno: externalData.turno.date, // fecha del truno,
      nombreConsultorio: externalData.nombreConsultorio,
      payment_id: paymentDetails.id,
      payment_description: paymentDetails.description,
      payment_payer_email: paymentDetails.payer.email, // Email del comprador
      payment_payer_identification: paymentDetails.payer.identification.number, // Número de identificación del comprador (DNI COMPRADOR)
      payment_status: paymentDetails.status, // Estado del pago (ej: "approved")
      payment_status_detail: paymentDetails.status_detail, // Detalle del estado (ej: "accredited")
      payment_transaction_amount: paymentDetails.transaction_amount, // Monto total de la transacciónpayment_
      payment_net_received_amount: paymentDetails.transaction_details.net_received_amount, // Monto neto recibido
      payment_total_paid_amount: paymentDetails.transaction_details.total_paid_amount, // Monto total pagado
      payment_date_approved: paymentDetails.date_approved // Fecha y hora de aprobación del pago
    }

    const user = await checkUserExistAndSave(data)

    if (!user) {
      return { status: 400, json: { message: 'Error al registrar usuario', user } }
    }

    // Escribir en la hoja de cálculo
    const turnoGuardado = await saveTurnoAndWritingSheet(data)

    // enviar Email
    const emailEnviado = await sendEmailSavedSlot(turnoGuardado, data) // turno guardado = data formatter

    if (emailEnviado.status !== 'sent') return { status: 400, json: { message: 'Error al enviar el email', emailEnviado } }

    if (!turnoGuardado) return { status: 400, json: { message: 'Error al guardar el turno', turnoGuardado } }
    return { status: 200, json: { message: 'turno guardado con exito', turnoGuardado } }
  } catch (error) {
    console.error('Error al consultar el pago:', error)
    return { status: 500, json: { message: 'Error al consultar el pago' } }
  }
}
