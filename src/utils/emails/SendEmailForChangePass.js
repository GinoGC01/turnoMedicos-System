import { EmailsControllers } from '../../controllers/emailsControllers.js'
import { htmlChangePass } from '../bodys/htmlChangePass.js'

export const sendEmailForChangePass = async ({ dni, email, nombre, pass }) => {
  if (!dni || !email || !nombre || pass) {
    console.log('Error al enviar el Email, faltan datos.')
    return
  }

  try {
    const officeEmail = 'ginociancia10@gmail.com'
    const dataHtml = htmlChangePass(nombre, pass)
    const asunto = 'Cambiar Password!'
    await EmailsControllers.SendGenericEmail(officeEmail, email, dataHtml, asunto)
    return { message: 'Email enviado correctamente', status: 'sent' }
  } catch (error) {
    console.error('sendEmailSavedSlot', error)
    return { message: 'Error al enviar el Email', status: 'no-sent' }
  }
}
