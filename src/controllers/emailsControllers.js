import { Resend } from 'resend'
import { htmlPaymentBody } from '../utils/bodys/htmlPaymentBody.js'
import { API_KEY_GOOGLE_GMAIL, API_KEY_RESEND } from '../config.js'
import nodemailer from 'nodemailer'

export class EmailsControllers {
  static async SendPayEmailResend (officeEmail, clientEmail, dataHtml) {
    const resend = new Resend(API_KEY_RESEND)
    const HTML = htmlPaymentBody(dataHtml)
    const { data, error } = await resend.emails.send({
      from: officeEmail,
      to: [clientEmail],
      subject: 'Turno agendado',
      html: HTML
    })

    if (error) {
      return console.error({ error })
    }

    console.log({ data })
  }

  static async SendPayEmail (officeEmail, clientEmail, dataHtml) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: officeEmail,
        pass: API_KEY_GOOGLE_GMAIL
      }
    })

    const mailOptions = {
      from: officeEmail, // Remitente
      to: clientEmail, // Destinatario
      subject: 'Turno agendado', // Asunto
      html: dataHtml // Versión en HTML
    }

    try {
      const info = await transporter.sendMail(mailOptions)
      console.log('Correo enviado:', info.messageId)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async SendGenericEmail (officeEmail, clientEmail, dataHtml, asunto) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: officeEmail,
        pass: API_KEY_GOOGLE_GMAIL
      }
    })

    const mailOptions = {
      from: officeEmail, // Remitente
      to: clientEmail, // Destinatario
      subject: asunto, // Asunto
      html: dataHtml // Versión en HTML
    }

    try {
      const info = await transporter.sendMail(mailOptions)
      console.log('Correo enviado:', info.messageId)
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
