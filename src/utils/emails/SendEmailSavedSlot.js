import { sheetSlot } from '../bodys/sheetSlot.js'
import { htmlPaymentBody } from '../bodys/htmlPaymentBody.js'
import { EmailsControllers } from '../../controllers/emailsControllers.js'

export const sendEmailSavedSlot = async (turnoGuardado, data) => {
  const { responseSlot } = turnoGuardado
  if (!responseSlot.profesional || !responseSlot.initialTurno) {
    console.log('Error al enviar el Email')
    return
  }

  try {
    const dateSheets = sheetSlot(responseSlot.profesional, responseSlot.initialTurno, data)
    const officeEmail = 'ginociancia10@gmail.com'
    const dataHtml = htmlPaymentBody(dateSheets)
    await EmailsControllers.SendPayEmail(officeEmail, data.email, dataHtml)
    return { message: 'Email enviado correctamente', status: 'sent' }
  } catch (error) {
    console.error('sendEmailSavedSlot', error)
    return { message: 'Error al enviar el Email', status: 'no-sent' }
  }
}
